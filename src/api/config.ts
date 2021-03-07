import wretch, { WretcherError } from 'wretch'

export interface ErrorResponse {
  status: number
  statusText: string
}

export const defaultErrMsg = (e: WretcherError) =>
  `${e.response.status} ${e.response.statusText}`

export let api = wretch().url('https://conduit.productionready.io/api')
