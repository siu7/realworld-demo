import { base } from './config'
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'

interface User {
  email: string
  token: string
  username: string
  bio: string
  image: string
}
interface Profile {
  username: string
  bio: string
  image: string
  following: boolean
}
interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Profile
}
interface Comment {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: Profile
}

interface UserResponse {
  user: User
}
interface ProfileResponse {
  profile: Profile
}
interface SingleArticleResponse {
  article: Article
}
interface MultipleArticlesResponse {
  articles: Article[]
  articlesCount: number
}
interface SingleCommentResponse {
  comment: Comment
}
interface MultipleCommentsResponse {
  comments: Comment[]
}
interface MultipleTagsResponse {
  tags: string[]
}

interface LoginRequestBody {
  user: {
    email: string
    password: string
  }
}
const usersBase = base.url('/users')
const users = {
  login: async function (
    email: string,
    password: string
  ): Promise<UserResponse> {
    let body: LoginRequestBody = { user: { email, password } }
    return await usersBase.url('/login').post(body).json()
  },
  signup: async function (
    email: string,
    password: string
  ): Promise<UserResponse> {
    let body: LoginRequestBody = { user: { email, password } }
    return await usersBase.url('/login').post(body).json()
  },
}

const loginAsyncThunk = createAsyncThunk(
  'users/login',
  async (body: LoginRequestBody) => {
    await usersBase.url('/login').post(body).json()
  }
)
