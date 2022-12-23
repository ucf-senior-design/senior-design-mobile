import { API_URL, WEB_CLIENT_ID } from "@env"
import { navigate } from "../../navigators"
import { createFetchRequestOptions } from "../../utils/fetch"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { save, load } from "../../utils/storage"
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

const needToVerifyEmailCode = 203
const needToAddDetailsCode = 202

async function storePartialCredentialResult(u: any) {
  await save("user", {
    userName: "",
    medicalInfo: [],
    allergies: [],
    uid: u.uid ?? "",
    email: u.email ?? "",
    name: u.name ?? "",
    profilePic: u.photo ?? "",
    finishedRegistering: false,
  })
}

export function doFacebookLogin() {}
export function doTwitterLogin() {
  console.log("twitter login")
}

export async function saveRegisterdUser(user: User) {
  await save("user", {
    ...user,
    finishedRegistering: true,
  })
}

export async function addDetails(user: User, callback: (response: AuthenticationResponse) => void) {
  const options = createFetchRequestOptions(JSON.stringify(user), "POST")
  const response = await fetch(`${API_URL}auth/details`, options)
  console.log("ADD USER")
  const result = await response.text()

  if (response.ok) {
    callback({ isSuccess: response.ok })
    return
  }
  callback({ isSuccess: response.ok, errorMessage: result })
}

export async function doGoogleLogin() {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
  try {
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
        alert(await response.text())
      }
    })
  } catch (e) {
    alert(e)
  }
}

export async function sendEmailVerification(callback: (response: AuthenticationResponse) => void) {
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
    callback({ isSuccess: response.ok })
  } else {
    callback({ isSuccess: response.ok, errorMessage: await response.text() })
  }
}

export async function doEmailPasswordRegister(
  register: { email: string; password: string },
  callback: (response: AuthenticationResponse) => void,
) {
  const options = createFetchRequestOptions(JSON.stringify(register), "POST")
  const response = await fetch(`${API_URL}auth/register`, options)

  if (response.ok) {
    await storePartialCredentialResult(await response.json())
    navigate("Details")
  } else {
    callback({ isSuccess: response.ok, errorMessage: await response.text() })
  }
}
export async function doEmailPasswordLogin(
  login: EmailPasswordLogin,
  callback: (response: AuthenticationResponse) => void,
) {
  const options = createFetchRequestOptions(JSON.stringify(login), "POST")
  const response = await fetch(`${API_URL}auth/login`, options)

  if (response.ok) {
    if (response.status === 200) {
      await saveRegisterdUser(await response.json())
      navigate("Landing")
    } else if (response.status === needToVerifyEmailCode) {
      navigate("Email")
    } else if (response.status === needToAddDetailsCode) {
      await storePartialCredentialResult(await response.json())
      navigate("Details")
    }
    return
  }
  const result = await response.text()
  callback({ isSuccess: response.ok, errorMessage: result })
}
