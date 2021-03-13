import wretch, { WretcherError } from 'wretch'

function isJSON(str: string | undefined) {
  try {
    if (str) return JSON.parse(str) && !!str
  } catch (e) {
    return false
  }
}
interface ErrorResponse {
  errors: {
    [key: string]: string[]
  }
}
function parseErrorDataToString(errorResponse: ErrorResponse) {
  let msg = ''
  let errors = errorResponse.errors
  for (const key in errors) {
    msg += key + ' '
    for (const error of errors[key]) {
      msg += error + ' '
    }
  }
  return msg
}

export const errorMsg = (e: WretcherError) =>
  e.response
    ? e.text && isJSON(e.text)
      ? parseErrorDataToString(JSON.parse(e.text))
      : `${e.response.status} ${e.response.statusText}`
    : e.toString()
let base = wretch().url('https://conduit.productionready.io/api')

let token: string | null = localStorage.getItem('@token')
if (token) base.auth(`Token ${token}`)

export type Article = {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: Date
  updatedAt: Date
  favorited: boolean
  favoritesCount: number
  author: Profile
}
export type ArticleResponse = {
  article: Article
}
export type ArticlesResponse = {
  articles: [Article]
  articlesCount: number
}
export type CommonGetArticlesParams = {
  limit?: number
  offset?: number
}
export type GetArticlesFilters = {
  tag?: string
  author?: string
  favorited?: string
}
export type GetArticlesParams = CommonGetArticlesParams & GetArticlesFilters
export type GetFeedArticlesParams = CommonGetArticlesParams
export type CreateArticleBody = {
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
}
export type UpdateArticleBody = {
  article: {
    title?: string
    description?: string
    body?: string
  }
}
let articleApi = base.url('/articles')
export const articles = {
  getMany: async (params: GetArticlesParams): Promise<ArticlesResponse> =>
    await articleApi.query(params).get().json(),

  getOne: async (slug: string): Promise<ArticleResponse> =>
    await articleApi.url(`/${slug}`).get().json(),

  createOne: async (body: CreateArticleBody): Promise<ArticleResponse> =>
    await articleApi.post(body).json(),

  updateOne: async ({
    slug,
    body,
  }: {
    slug: string
    body: UpdateArticleBody
  }): Promise<ArticleResponse> =>
    await articleApi.url(`/${slug}`).put(body).json(),

  deleteOne: async (slug: string): Promise<any> =>
    await articleApi.url(`/${slug}`).delete().json(),

  getFeeds: async (params: GetFeedArticlesParams): Promise<ArticlesResponse> =>
    await articleApi.url('/feed').query(params).get().json(),

  favoriteOne: async (slug: string): Promise<ArticleResponse> =>
    await articleApi.url(`/${slug}/favorite`).post().json(),

  unfavoriteOne: async (slug: string): Promise<ArticleResponse> =>
    await articleApi.url(`/${slug}/favorite`).delete().json(),
}

export type Comment = {
  id: number
  createdAt: Date
  updatedAt: Date
  body: string
  author: Profile
}
export type CreateCommentBody = {
  comment: {
    body: string
  }
}
export type CommentResponse = {
  comment: Comment
}
export type CommentsResponse = {
  comments: Comment[]
}
export const comments = {
  getMany: async (slug: string): Promise<CommentsResponse> =>
    await articleApi.url(`/${slug}/comments`).get().json(),

  createOne: async ({
    slug,
    body,
  }: {
    slug: string
    body: CreateCommentBody
  }): Promise<CommentResponse> =>
    await articleApi.url(`/${slug}/comments`).post(body).json(),

  deleteOne: async ({ slug, id }: { slug: string; id: number }): Promise<any> =>
    await articleApi.url(`/${slug}/comments/${id}`).delete().json(),
}

let profileApi = base.url('/profiles')
export type Profile = {
  username: string
  bio: string
  image: string
  following: boolean
}
export type ProfileResponse = {
  profile: Profile
}
export const profiles = {
  getOne: async (username: string): Promise<ProfileResponse> =>
    await profileApi.url(`/${username}`).get().json(),
  followOne: async (username: string): Promise<ProfileResponse> =>
    await profileApi.url(`/${username}`).post().json(),
  unfollowOne: async (username: string): Promise<ProfileResponse> =>
    await profileApi.url(`/${username}`).delete().json(),
}

let usersApi = base.url('/users')
export type User = {
  email: string
  token: string
  username: string
  bio: string
  image: string | null
}
export type UserResponse = {
  user: User
}
export type LoginBody = {
  user: {
    email: string
    password: string
  }
}
export type SignupBody = {
  user: {
    username: string
    email: string
    password: string
  }
}
export type UpdateUserBody = {
  user: {
    username?: string
    email?: string
    password?: string
    bio?: string
    image?: string
  }
}
export const users = {
  login: async (body: LoginBody): Promise<UserResponse> =>
    await usersApi.url('/login').post(body).json(),
  signup: async (body: SignupBody): Promise<UserResponse> =>
    await usersApi.post(body).json(),
  getCurrent: async (): Promise<UserResponse> => await usersApi.get().json(),
  updateOne: async (body: UpdateUserBody): Promise<UserResponse> =>
    await usersApi.put(body).json(),
}

let tagsApi = base.url('/tags')
export type TagsResponse = {
  tags: string[]
}
export const tags = {
  getMany: async (): Promise<TagsResponse> => await tagsApi.get().json(),
}
