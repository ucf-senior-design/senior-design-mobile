type Method = "POST" | "GET" | "DELETE"

export function createFetchRequestOptions(body: string, method: Method) {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  var requestOptions: RequestInit = {
    method: method,
    headers: myHeaders,
    body: body,
    redirect: "follow",
  }

  return requestOptions;
}
