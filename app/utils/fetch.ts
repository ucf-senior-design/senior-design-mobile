export function createFetchRequestOptions(
  body: string | null,
  method: "POST" | "GET" | "DELETE" | "PUT",
) {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const requestOptions: RequestInit = {
    method,
    headers: myHeaders,
    body,
    redirect: "follow",
  }

  return requestOptions
}
