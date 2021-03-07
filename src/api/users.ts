import { api } from './config'

interface User {
  email: string
  token: string
  username: string
  bio: string
  image: string | null
}

interface LoginRequestBody {
  user: {
    email: string
    password: string
  }
}

interface UserResponse {
  user: User
}

interface SignupRequestBody {
  user: {
    username: string
    email: string
    password: string
  }
}

interface UpdateUserRequestBody {
  user: {
    username?: string
    email?: string
    password?: string
    bio?: string
    image?: string
  }
}

export type {
  User,
  LoginRequestBody,
  UserResponse,
  SignupRequestBody,
  UpdateUserRequestBody,
}

let wretch = api.url('/users')

const login = async (user: LoginRequestBody): Promise<UserResponse> =>
  await wretch.url('/login').post(user).json()

const signup = async (user: SignupRequestBody): Promise<UserResponse> =>
  await wretch.post(user).json()

const getCurrentUser = async (): Promise<UserResponse> =>
  await wretch.get().json()

const updateUser = async (user: UpdateUserRequestBody): Promise<UserResponse> =>
  await wretch.put(user).json()

export const usersApi = {
  login,
  signup,
  getCurrentUser,
  updateUser,
}
