import { api } from './config'

interface TagsResponse {
  tags: [string]
}

export type { TagsResponse }

let wretch = api.url('/tags')

const getTags = async (): Promise<TagsResponse> => await wretch.get().json()

export const tagsApi = {
  getTags,
}
