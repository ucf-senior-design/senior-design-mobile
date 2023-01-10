type Method = "POST" | "GET" | "DELETE"

export function createFetchRequestOptions(body: string, method: Method) {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("Accept", "application/json")
  const requestOptions: RequestInit = {
    method,
    headers: myHeaders,
    body,
    redirect: "follow",
  }

  return requestOptions
}
