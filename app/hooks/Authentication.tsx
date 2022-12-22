import { API_URL } from "@env"
import { createFetchRequestOptions } from "../utils/fetch"

interface EmailPasswordLogin {
  email: string
  password: string
}

interface AuthenticationResponse {
  isSuccess: boolean
  errorMessage?: string
}

export function Auth() {
  async function doFacebookLogin() {}
  async function doTwitterLogin() {}
  async function doGoogleLogin() {}

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
