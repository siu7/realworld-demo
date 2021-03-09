import wretch from 'wretch'

let base = wretch()
  .url('https://conduit.productionready.io/api')
  .catcher('error', (e) => ({
    error: e.response
      ? e.text
        ? e.text.replace(/\\/g, '')
        : `${e.response.status} ${e.response.statusText}`
      : e.toString(),
  }))
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
export type MultiArticlesResponse = {
  articles: [Article]
  articlesCount: number
}
export type ListArticlesParams = {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}
export type FeedArticlesParams = {
  limit?: number
  offset?: number
}
export type PostArticleBody = {
  article: {
    title: string
    description: string
    body: string
    tagList: string[]
  }
}
export type PutArticleBody = {
  article: {
    title?: string
    description?: string
    body?: string
  }
}
let api = base.url('/articles')
export const articles = {
  list: async (params: ListArticlesParams): Promise<MultiArticlesResponse> =>
    await api.query(params).get().json(),
  get: async (slug: string): Promise<ArticleResponse> =>
    await api.url(`/${slug}`).get().json(),
  post: async (body: PostArticleBody): Promise<ArticleResponse> =>
    await api.post(body).json(),
  put: async (slug: string, body: PutArticleBody): Promise<ArticleResponse> =>
    await api.url(`/${slug}`).put(body).json(),
  del: async (slug: string): Promise<any> =>
    await api.url(`/${slug}`).delete().json(),
  feed: async (params: FeedArticlesParams): Promise<MultiArticlesResponse> =>
    await api.url('/feed').query(params).get().json(),
  fav: async (slug: string): Promise<ArticleResponse> =>
    await api.url(`/${slug}/favorite`).post().json(),
  unfav: async (slug: string): Promise<ArticleResponse> =>
    await api.url(`/${slug}/favorite`).delete().json(),
}

export type Comment = {
  id: number
  createdAt: Date
  updatedAt: Date
  body: string
  author: Profile
}
export type PostCommentBody = {
  comment: {
    body: string
  }
}
export type CommentResponse = {
  comment: Comment
}
export type MultiCommentsResponse = {
  comments: Comment[]
}
export const comments = {
  list: async (slug: string): Promise<MultiCommentsResponse> =>
    await api.url(`/${slug}/comments`).get().json(),
  post: async (slug: string, body: PostCommentBody): Promise<CommentResponse> =>
    await api.url(`/${slug}/comments`).post(body).json(),
  del: async (slug: string, id: number): Promise<any> =>
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
  get: async (username: string): Promise<ProfileResponse> =>
    await api.url(`/${username}`).get().json(),
  follow: async (username: string): Promise<ProfileResponse> =>
    await api.url(`/${username}`).post().json(),
  unfollow: async (username: string): Promise<ProfileResponse> =>
    await api.url(`/${username}`).delete().json(),
}

api = base.url('/users')
export type User = {
  email: string
  token: string
  username: string
  bio: string
  image: string | null
}
type UserResponse = {
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
export type PutUserBody = {
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
    await api.url('/login').post(body).json(),
  signup: async (body: SignupBody): Promise<UserResponse> =>
    await api.post(body).json(),
  get: async (): Promise<UserResponse> => await api.get().json(),
  put: async (body: PutUserBody): Promise<UserResponse> =>
    await api.put(body).json(),
}

api = base.url('/tags')
export type TagsResponse = {
  tags: string[]
}
export const tags = {
  list: async (): Promise<TagsResponse> => await api.get().json(),
}
