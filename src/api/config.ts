import wretch from 'wretch'
import type { WretcherError } from 'wretch'

interface ErrorResponse {
  errors: {
    [index: string]: [string] | []
  }
}

function hasJsonStructure(str: string) {
  if (typeof str !== 'string') return false
  try {
    const result = JSON.parse(str)
    const type = Object.prototype.toString.call(result)
    return type === '[object Object]' || type === '[object Array]'
  } catch (err) {
    return false
  }
}

export function defaultErrMsg(e: WretcherError) {
  if (e.response) {
    if (e.text) {
      if (hasJsonStructure(e.text)) {
        let ob = JSON.parse(e.text) as ErrorResponse
        let errors = ob.errors
        let msg = ''
        for (let key in errors) {
          msg += key + ' '
          msg += errors[key].map((v: string) => v).join(' & ')
          msg += ' '
        }
        return msg
      } else return e.text
    } else return `${e.response.status} ${e.response.statusText}`
  } else return e.toString()
}

const api = wretch().url('https://conduit.productionready.io/api')

export const authHeader = (token: string) => `Token ${token}`
export { api }

//export let api = wretch().url('localhost:1337/api')
