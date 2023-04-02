export function createFetchRequestOptions(
  body: string | null,
  method: "POST" | "GET" | "DELETE" | "PUT",
) {
  const myHeaders = new Headers()
  myHeaders.append("Origin", "https://we-tinerary.vercel.app")
  myHeaders.append("Access-Control-Request-Method", method)
  myHeaders.append("Access-Control-Request-Headers", "X-Requested-With")
  if (body !== null) {
    myHeaders.append("Content-Type", "application/json")
  }

  const requestOptions: RequestInit =
    method !== "GET"
      ? { method: "OPTIONS", headers: myHeaders, redirect: "follow", body: body }
      : {
          method,
        }

  return requestOptions
}
