export function createFetchRequestOptions(
  body: string | null,
  method: "POST" | "GET" | "DELETE" | "PUT",
) {
  const myHeaders = new Headers()
  if (body !== null) {
    myHeaders.append("Content-Type", "application/json")
  }

  const requestOptions: RequestInit =
    method !== "GET"
      ? {
          method,
          headers: myHeaders,
          redirect: "follow",
          body,
        }
      : {
          method,
        }

  return requestOptions
}
