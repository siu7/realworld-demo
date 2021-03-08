import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import type {
  User,
  LoginRequestBody,
  UserResponse,
  SignupRequestBody,
  UpdateUserRequestBody,
} from 'api/users'
import { usersApi } from 'api/users'
import { defaultErrMsg } from 'api/config'
import { tokenSelector } from 'features/user/selectors'

interface UserState {
  user?: User
  authed: boolean
  loginLoading: boolean
  signupLoading: boolean
  getCurrentUserLoading: boolean
  updateUserLoading: boolean
  error?: string
}

const initialState: UserState = {
  authed: false,
  loginLoading: false,
  signupLoading: false,
  getCurrentUserLoading: false,
  updateUserLoading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError(state) {
      delete state.error
    },
    loginRequest(state) {
      state.loginLoading = true
    },
    loginSuccess(state, action: PayloadAction<UserResponse>) {
      state.user = action.payload.user
      state.loginLoading = false
      delete state.error
      state.authed = true
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loginLoading = false
    },

    signupRequest(state) {
      state.signupLoading = true
    },
    signupSuccess(state, action: PayloadAction<UserResponse>) {
      state.user = action.payload.user
      state.signupLoading = false
      delete state.error
      state.authed = true
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.signupLoading = false
    },

    getCurrentUserRequest(state) {
      state.getCurrentUserLoading = true
    },
    getCurrentUserSuccess(state, action: PayloadAction<UserResponse>) {
      state.user = action.payload.user
      state.getCurrentUserLoading = false
    },
    getCurrentUserFailure(state, _action: PayloadAction<string>) {
      state.getCurrentUserLoading = false
    },

    updateUserRequest(state) {
      state.updateUserLoading = true
    },
    updateUserSuccess(state, action: PayloadAction<UserResponse>) {
      state.user = action.payload.user
      state.updateUserLoading = false
    },
    updateUserFailure(state, _action: PayloadAction<string>) {
      state.updateUserLoading = false
    },
  },
})

export const { resetError } = userSlice.actions

const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions
export default userSlice.reducer

const login = (user: LoginRequestBody): AppThunk =>
  async function (dispatch) {
    try {
      dispatch(loginRequest())
      let res = await usersApi.login(user)
      dispatch(loginSuccess(res))
    } catch (e) {
      dispatch(loginFailure(defaultErrMsg(e)))
    }
  }

const signup = (user: SignupRequestBody): AppThunk =>
  async function (dispatch) {
    try {
      dispatch(signupRequest())
      let res = await usersApi.signup(user)
      dispatch(signupSuccess(res))
    } catch (e) {
      dispatch(signupFailure(defaultErrMsg(e)))
    }
  }

const getCurrentUser = (): AppThunk =>
  async function (dispatch, getState) {
    try {
      dispatch(getCurrentUserRequest())
      let token = tokenSelector(getState())
      if (token) {
        let res = await usersApi.getCurrentUser(token)
        dispatch(getCurrentUserSuccess(res))
      }
    } catch (e) {
      dispatch(getCurrentUserFailure(defaultErrMsg(e)))
    }
  }

const updateUser = (user: UpdateUserRequestBody): AppThunk =>
  async function (dispatch, getState) {
    try {
      dispatch(updateUserRequest())
      let token = tokenSelector(getState())
      if (token) {
        let res = await usersApi.updateUser(user, token)
        dispatch(updateUserSuccess(res))
      }
    } catch (e) {
      dispatch(updateUserFailure(defaultErrMsg(e)))
    }
  }

export { login, signup, getCurrentUser, updateUser }
