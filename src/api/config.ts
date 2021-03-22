import wretch, { WretcherError } from 'wretch'

function isJSON(str: string | undefined) {
  try {
    if (str) return JSON.parse(str) && !!str
  } catch (e) {
    return false
  }
}
export interface ErrorResponse {
  errors: {
    [key: string]: string[]
  }
}
export const handleError = (e: WretcherError): ErrorResponse['errors'] =>
  e.response
    ? e.text && isJSON(e.text)
      ? JSON.parse(e.text).errors
      : { unknown: `${e.response.status} ${e.response.statusText}` }
    : { unknown: e.toString() }

function createApi() {
  let token: string | null = localStorage.getItem('jwtToken')
  if (token) {
    return wretch()
      .url('https://conduit.productionready.io/api')
      .auth(`Token ${token}`)
  } else {
    return wretch().url('https://conduit.productionready.io/api')
  }
}
export const base = createApi()
