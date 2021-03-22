import { createSlice, combineReducers } from '@reduxjs/toolkit'
import { users } from 'api/api'
import type { User } from 'api/api'
import {
  createApiAsyncThunk,
  createExtraReducer,
  createApiAsyncThunkWithNoArg,
} from 'app/utils'

const login = createApiAsyncThunk(users.login, 'user/login')
const loginReducer = createExtraReducer(login)

const signup = createApiAsyncThunk(users.signup, 'user/signup')
const signupReducer = createExtraReducer(signup)

const updateOne = createApiAsyncThunk(users.updateOne, 'user/updateOne')
const updateOneReducer = createExtraReducer(updateOne)

const getCurrent = createApiAsyncThunkWithNoArg(
  users.getCurrent,
  'user/getCurrent'
)
const getCurrentReducer = createExtraReducer(getCurrent)

interface InitialState {
  user: User | null
}
let initialState: InitialState = {
  user: null,
}
function saveJwtToken(token: string) {
  localStorage.setItem('jwtToken', token)
}

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      localStorage.clear()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload.user
      saveJwtToken(payload.user.token)
    })
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.user = payload.user
      saveJwtToken(payload.user.token)
    })
    builder.addCase(getCurrent.fulfilled, (state, { payload }) => {
      state.user = payload.user
    })
    builder.addCase(updateOne.fulfilled, (state, { payload }) => {
      state.user = payload.user
    })
  },
})
export const userReducer = combineReducers({
  data: userSlice.reducer,
  login: loginReducer,
  signup: signupReducer,
  updateOne: updateOneReducer,
  getCurrent: getCurrentReducer,
})

export { login, signup, updateOne, getCurrent }
export const { logout } = userSlice.actions
