import wretch, { WretcherError } from 'wretch'

function isJSON(str: string | undefined) {
  try {
    if (str) return JSON.parse(str) && !!str
  } catch (e) {
    return false
  }
}

export const errorMsg = (e: WretcherError) =>
  e.response
    ? e.text && isJSON(e.text)
      ? e.text.replace(/\\/g, '')
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
let api = base.url('/articles')
export const articles = {
  get: async (params: GetArticlesParams): Promise<ArticlesResponse> =>
    await api.query(params).get().json(),
  getOne: async (slug: string): Promise<ArticleResponse> =>
    await api.url(`/${slug}`).get().json(),
  create: async (body: CreateArticleBody): Promise<ArticleResponse> =>
    await api.post(body).json(),
  update: async (
    slug: string,
    body: UpdateArticleBody
  ): Promise<ArticleResponse> => await api.url(`/${slug}`).put(body).json(),
  delete: async (slug: string): Promise<any> =>
    await api.url(`/${slug}`).delete().json(),
  getFeeds: async (params: GetFeedArticlesParams): Promise<ArticlesResponse> =>
    await api.url('/feed').query(params).get().json(),
  favorite: async (slug: string): Promise<ArticleResponse> =>
    await api.url(`/${slug}/favorite`).post().json(),
  unfavorite: async (slug: string): Promise<ArticleResponse> =>
    await api.url(`/${slug}/favorite`).delete().json(),
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
  get: async (slug: string): Promise<CommentsResponse> =>
    await api.url(`/${slug}/comments`).get().json(),
  create: async (
    slug: string,
    body: CreateCommentBody
  ): Promise<CommentResponse> =>
    await api.url(`/${slug}/comments`).post(body).json(),
  delete: async (slug: string, id: number): Promise<any> =>
    await api.url(`/${slug}/comments/${id}`).delete().json(),
}

api = base.url('/profiles')
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
    await api.url(`/${username}`).get().json(),
  follow: async (username: string): Promise<ProfileResponse> =>
    await api.url(`/${username}`).post().json(),
  unfollow: async (username: string): Promise<ProfileResponse> =>
    await api.url(`/${username}`).delete().json(),
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
  getCurrent: async (): Promise<UserResponse> => await api.get().json(),
  update: async (body: UpdateUserBody): Promise<UserResponse> =>
    await usersApi.put(body).json(),
}

let tagsApi = base.url('/tags')
export type TagsResponse = {
  tags: string[]
}
export const tags = {
  get: async (): Promise<TagsResponse> => await tagsApi.get().json(),
}
