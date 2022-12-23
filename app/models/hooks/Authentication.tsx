import { API_URL, WEB_CLIENT_ID } from "@env"
import { navigate } from "../../navigators"
import { createFetchRequestOptions } from "../../utils/fetch"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { save, load } from "../../utils/storage"
import React from "react"

interface EmailPasswordLogin {
  email: string
  password: string
}

interface AuthenticationResponse {
  isSuccess: boolean
  errorMessage?: string
}

interface User {
  uid: string
  email: string
  name: string
  profilePic: string
  userName: string
  medicalInfo: Array<string>
  allergies: Array<string>
}

export interface Auth {
  doGoogleLogin: () => void
  doTwitterLogin: () => void
  doFacebookLogin: () => void
  doEmailPasswordLogin: (
    login: EmailPasswordLogin,
    callback: (response: AuthenticationResponse) => void,
  ) => void
}

export function Auth(): Auth {
  // Set up Google Sign In for use.
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    })
  }, [])

  async function storePartialCredentialResult(u: any) {
    await save("user", {
      userName: "",
      medicalInfo: [],
      allergies: [],
      uid: u.uid,
      email: u.email,
      name: u.name,
      profilePic: u.photo,
      finishedRegistering: false,
    })
  }
  function doFacebookLogin() {}
  function doTwitterLogin() {
    console.log("twitter login")
  }
  async function doGoogleLogin() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    await GoogleSignin.signIn().then(async (user) => {
      const options = createFetchRequestOptions(
        JSON.stringify({
          provider: "google",
          idToken: user.idToken,
        }),
        "POST",
      )

      const response = await fetch(`${API_URL}auth/loginWithCred`, options)

      if (response.ok) {
        if (response.status === 200) {
          navigate("Landing")
        } else if (response.status === 202) {
          navigate("Details")
          await storePartialCredentialResult(await response.json())
        }
      } else {
        // callback unsuccesful
      }
    })
  }

  async function doEmailPasswordLogin(
    login: EmailPasswordLogin,
    callback: (response: AuthenticationResponse) => void,
  ) {
    const options = createFetchRequestOptions(JSON.stringify(login), "POST")
    const response = await fetch(`${API_URL}auth/login`, options)
    const result = await response.text()

    if (response.ok) {
      callback({ isSuccess: response.ok })
      return
    }
    callback({ isSuccess: response.ok, errorMessage: result })
  }

  return { doGoogleLogin, doTwitterLogin, doFacebookLogin, doEmailPasswordLogin }
}
