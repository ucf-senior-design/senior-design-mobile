import { API_URL } from "@env"
import { navigate } from "../../navigators"
import { createFetchRequestOptions } from "../../utils/fetch"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { save, load, remove } from "../../utils/storage"
import React from "react"
import { LoginManager as FacebookLogin, AccessToken } from "react-native-fbsdk-next"
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

  async function doFacebookLogin() {
    FacebookLogin.logInWithPermissions(["public_profile"]).then(
      function () {
        AccessToken.getCurrentAccessToken().then(async (facebookToken) => {
          await doLoginWithCredentials("facebook", facebookToken.accessToken)
        })
      },
      function (error) {
        alert(error)
      },
    )
  }

  async function saveRegisterdUser(user: User) {
    await save("user", {
      ...user,
      didFinishRegister: true,
    })
    setUser({ ...user, didFinishRegister: true })
  }

  async function addDetails(user: User, callback: (response: AuthenticationResponse) => void) {
    // TODO: Upload Profile Picture For User
    const userWithNoPicture = { ...user, profilePic: "" }
    const options = createFetchRequestOptions(JSON.stringify(userWithNoPicture), "POST")
    const response = await fetch(`${API_URL}auth/details`, options)
    const result = await response.text()

    if (response.ok) {
      if (response.status === EMAIL_VERIFIED) {
        navigate("Home")
        return
      }
      callback({ isSuccess: response.ok })
      return
    }
    callback({ isSuccess: response.ok, errorMessage: result })
  }

  async function doGoogleLogin() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    try {
      await GoogleSignin.signIn().then(async (user) => {
        await doLoginWithCredentials("google", user.idToken)
      })
    } catch (e) {
      alert(e)
    }
  }

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
    console.log(API_URL)

    const options = createFetchRequestOptions(JSON.stringify(register), "POST")
    const response = await fetch(`${API_URL}auth/register`, options)

    console.log(await response.text())
    if (response.ok) {
      await storePartialCredentialResult(await response.json())
      navigate("Details")
    } else {
      callback({ isSuccess: response.ok, errorMessage: await response.text() })
    }
  }

  async function doEmailPasswordLogin(
    login: EmailPasswordLogin,
    callback: (response: AuthenticationResponse) => void,
  ) {
    const options = createFetchRequestOptions(
      JSON.stringify({ ...login, purpose: "email" }),
      "POST",
    )
    const response = await fetch(`${API_URL}auth/login`, options)

    if (response.ok) {
      if (response.status === 200) {
        await saveRegisterdUser(await response.json())
        navigate("Home")
      } else if (response.status === MUST_VERIFY_EMAIL) {
        navigate("Email")
      } else if (response.status === MUST_ADD_DETAILS) {
        await storePartialCredentialResult(await response.json())
        navigate("Details")
      }
      return
    }
    const result = await response.text()
    callback({ isSuccess: response.ok, errorMessage: result })
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
