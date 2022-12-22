import { API_URL, FIREBASE_CLIENT_ID, TWITTER_KEY, TWITTER_SECRET } from "@env"
import { createFetchRequestOptions } from "../utils/fetch"
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"
import { useEffect, useState } from "react"

interface EmailPasswordLogin {
  email: string
  password: string
}

interface AuthenticationResponse {
  isSuccess: boolean
  errorMessage?: string
}

export function Auth() {
  async function doFacebookLogin() {
    console.log("do twitter login")
  }
  async function doTwitterLogin() {
    console.log("do twitter login")
  }
  async function doGoogleLogin() {
    GoogleSignin.configure({
      webClientId: API_URL,
    })
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()
    console.log('here')
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // // Sign-in the user with the credential
    // await auth().signInWithCredential(googleCredential)
  }

   async function doEmailPasswordLogin(
    login: EmailPasswordLogin,
    callback: (response: AuthenticationResponse) => void,
  ) {
    const options = createFetchRequestOptions(JSON.stringify(login), "POST")
    const response = await fetch(`${API_URL}auth/login`, options)
    const result = await response.text()

    if (response.ok) {
      callback({ isSuccess: true })
      return
    }
    callback({ isSuccess: false, errorMessage: result })
  }

  return { doGoogleLogin, doTwitterLogin, doFacebookLogin, doEmailPasswordLogin }
}
