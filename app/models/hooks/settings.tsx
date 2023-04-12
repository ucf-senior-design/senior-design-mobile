import { createFetchRequestOptions } from "../../utils/fetch"

/*
update email
update preferences/medical info/profile picture/allergies
update emergency contact info 
*/
const API_URL = process.env.API_URL
interface Response {
  result?: any
  isSuccess: boolean
  errorMessage?: string
}

export default async function updateUser(
  user: {
    medicalInfo: Array<string>
    name: string
    allergies: Array<string>
    uid: string
  },
  callback: (response: Response) => void,
) {
  const options = createFetchRequestOptions(JSON.stringify({ user }), "PUT")

  const response = await fetch(`${API_URL}auth/user`, options)

  if (response.ok) {
    callback({ result: await response.text(), isSuccess: response.ok })
  } else {
    callback({ isSuccess: response.ok, errorMessage: await response.text() })
  }
}
