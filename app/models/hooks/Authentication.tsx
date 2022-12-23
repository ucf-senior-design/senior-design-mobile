import { API_URL } from "@env"
import { createFetchRequestOptions } from "../../utils/fetch"

interface EmailPasswordLogin {
  email: string
  password: string
}

interface AuthenticationResponse {
  isSuccess: boolean
  errorMessage?: string
}

export function Auth() {
  function doFacebookLogin() {
    console.log("facebook login")
  }
  function doTwitterLogin() {
    console.log("twitter login")
  }
  function doGoogleLogin() {
    console.log("google login")
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
