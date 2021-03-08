import wretch, { WretcherError } from 'wretch'

interface ErrorResponse {
  errors: {
    [index: string]: [string] | []
  }
}

export function defaultErrMsg(e: WretcherError) {
  if (e.response) {
    if (e.text) {
      let ob = JSON.parse(e.text) as ErrorResponse
      let errors = ob.errors
      let msg = ''
      Object.keys(errors).map(function (key) {
        msg += key + ' '
        errors[key].map(function (v: string) {
          msg += v
        })
      })
      return msg
    } else return `${e.response.status} ${e.response.statusText}`
  } else return e.toString()
}

export let api = wretch().url('https://conduit.productionready.io/api')
//export let api = wretch().url('localhost:1337/api')
