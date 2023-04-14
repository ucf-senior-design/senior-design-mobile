import { API_URL, FIREBASE_API_KEY } from "@env"
import { navigate } from "../../navigators"
import { createFetchRequestOptions, createFirebaseFetchRequestOptions } from "../../utils/fetch"
import { save, load, remove } from "../../utils/storage"
import React from "react"
import { User } from "../../../types/auth"

interface EmailPasswordLogin {
  email: string
  password: string
}

interface AuthenticationResponse {
  isSuccess: boolean
  errorMessage?: string
}

interface AuthContext {
  user?: User & { didFinishRegister: boolean }
  saveRegisterdUser: (user: User) => Promise<void>
  doFacebookLogin: () => Promise<void>
  doGoogleLogin: () => Promise<void>
  doEmailPasswordLogin: (
    login: EmailPasswordLogin,
    callback: (response: AuthenticationResponse) => void,
  ) => Promise<void>
  doEmailPasswordRegister: (
    register: { email: string; password: string },
    callback: (response: AuthenticationResponse) => void,
  ) => Promise<void>
  doLogout: () => Promise<void>
  addDetails: (user: User, callback: (response: AuthenticationResponse) => void) => Promise<void>
  sendEmailVerification: (callback: (response: AuthenticationResponse) => void) => Promise<void>
  sendPasswordReset: (callback: (response: AuthenticationResponse) => void) => Promise<void>
}

const MUST_VERIFY_EMAIL = 203
const MUST_ADD_DETAILS = 202
const EMAIL_VERIFIED = 201

// Use this to handle any authentication processes
const AuthContext = React.createContext<AuthContext>({} as AuthContext)

export function useAuth(): AuthContext {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User & { didFinishRegister: boolean }>()

  React.useEffect(() => {
    maybeLoadPersistedUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        saveRegisterdUser,
        doFacebookLogin,
        doGoogleLogin,
        doEmailPasswordLogin,
        doEmailPasswordRegister,
        addDetails,
        doLogout,
        sendEmailVerification,
        sendPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  )

  async function maybeLoadPersistedUser() {
    const user = await load("user")

    if (user !== undefined && user !== null) {
      setUser(user)
    }
  }

  async function doLogout() {
    await remove("user")
    setUser(undefined)
  }

  async function storePartialCredentialResult(u: any) {
    console.log("USER", u)
    const user = {
      userName: "",
      medicalInfo: [],
      allergies: [],
      uid: u.uid ?? "",
      email: u.email ?? "",
      name: u.name ?? "",
      profilePic: u.photo ?? "",
      didFinishRegister: false,
    }
    await save("user", user)

    setUser(user)
  }

  async function doLoginWithCredentials(
    provider: "google" | "facebook" | "twitter",
    idToken: string,
  ) {
    const options = createFetchRequestOptions(
      JSON.stringify({
        provider,
        idToken,
      }),
      "POST",
    )

    const response = await fetch(`${API_URL}auth/loginWithCred`, options)

    if ((response.ok, response.status)) {
      if (response.status === 200) {
        await saveRegisterdUser(await response.json())
      }
      if (response.status === 202) {
        await storePartialCredentialResult(await response.json())
      }
    } else {
      alert(await response.text())
    }
  }

  async function doFacebookLogin() {}

  async function saveRegisterdUser(user: User) {
    await save("user", {
      ...user,
      didFinishRegister: true,
    })
    setUser({ ...user, didFinishRegister: true })
  }

  async function addDetails(user: User, callback: (response: AuthenticationResponse) => void) {
    const userWithNoPicture = { ...user, profilePic: "" }

    const options = createFetchRequestOptions(JSON.stringify(userWithNoPicture), "POST")
    const response = await fetch(`${API_URL}auth/details`, options)
    const result = await response.text()

    if (response.ok) {
      console.log("added")
      navigate("Email")
      callback({ isSuccess: response.ok })
      return
    }

    callback({ isSuccess: response.ok, errorMessage: result })
  }

  async function doGoogleLogin() {}

  async function sendEmailVerification(callback: (response: AuthenticationResponse) => void) {
    const user = await load("user")

    const options = createFetchRequestOptions(
      JSON.stringify({
        email: user.email,
        uid: user.uid,
      }),
      "POST",
    )

    const response = await fetch(`${API_URL}auth/email`, options)
    if (response.ok) {
      if (response.status === EMAIL_VERIFIED) {
        navigate("Home")
      }
      callback({ isSuccess: response.ok })
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() })
    }
  }

  async function doEmailPasswordRegister(
    register: { email: string; password: string },
    callback: (response: AuthenticationResponse) => void,
  ) {
    const firebaseOptions = createFirebaseFetchRequestOptions(JSON.stringify(register), "POST")
    await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      firebaseOptions,
    )
      .then(async (firebaseResponse) => {
        if (firebaseResponse.ok) {
          let result = await firebaseResponse.json()
          await storePartialCredentialResult({ ...result, uid: result.localId })
          navigate("Details")
        } else {
          alert(await firebaseResponse.text())
        }
      })
      .catch((e) => {
        console.warn(e)
      })
  }

  async function doEmailPasswordLogin(
    login: EmailPasswordLogin,
    callback: (response: AuthenticationResponse) => void,
  ) {
    const firebaseOptions = createFirebaseFetchRequestOptions(JSON.stringify(login), "POST")
    await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      firebaseOptions,
    )
      .then(async (result) => {
        if (result.ok) {
          let u1 = await result.json()
          const options = createFetchRequestOptions(
            JSON.stringify({ ...u1, uid: u1.localId }),
            "POST",
          )
          const response = await fetch(`${API_URL}auth/login`, options)

          if (response.ok) {
            if (response.status === 200) {
              let user = await response.json()

              await saveRegisterdUser(user)
              navigate("Home")
            } else if (response.status === MUST_VERIFY_EMAIL) {
              await storePartialCredentialResult({ ...u1, uid: u1.localId })
              navigate("Email")
            } else if (response.status === MUST_ADD_DETAILS) {
              await storePartialCredentialResult({ ...u1, uid: u1.localId })
              navigate("Details")
            }
          } else {
            const result = await response.text()
            callback({ isSuccess: response.ok, errorMessage: result })
          }
        } else {
          alert(await result.text())
        }
      })
      .catch((e) => {
        console.log(e)
        alert(e)
      })
  }

  async function sendPasswordReset(callback: (response: AuthenticationResponse) => void) {
    const options = createFetchRequestOptions(JSON.stringify({ purpose: "password" }), "POST")
    const response = await fetch(`${API_URL}auth/email`, options)

    if (response.ok) {
      if (response.status === EMAIL_VERIFIED) {
        navigate("Home")
      }
      callback({ isSuccess: response.ok })
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() })
    }
  }
}
