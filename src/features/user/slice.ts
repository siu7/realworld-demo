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

interface UserState {
  user: User | null
  loginLoading: boolean
  signupLoading: boolean
  getCurrentUserLoading: boolean
  updateUserLoading: boolean
}

const initialState: UserState = {
  user: null,
  loginLoading: false,
  signupLoading: false,
  getCurrentUserLoading: false,
  updateUserLoading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loginLoading = true
    },
    loginSuccess(state, action: PayloadAction<UserResponse>) {
      state.user = action.payload.user
      state.loginLoading = false
    },
    loginFailure(state, _action: PayloadAction<string>) {
      state.loginLoading = false
    },

    signupRequest(state) {
      state.signupLoading = true
    },
    signupSuccess(state, action: PayloadAction<UserResponse>) {
      state.user = action.payload.user
      state.signupLoading = false
    },
    signupFailure(state, _action: PayloadAction<string>) {
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
    dispatch(loginRequest())
    try {
      let res = await usersApi.login(user)
      dispatch(loginSuccess(res))
    } catch (e) {
      dispatch(loginFailure(defaultErrMsg(e)))
    }
  }

const signup = (user: SignupRequestBody): AppThunk =>
  async function (dispatch) {
    dispatch(signupRequest())
    try {
      let res = await usersApi.signup(user)
      dispatch(signupSuccess(res))
    } catch (e) {
      dispatch(signupFailure(defaultErrMsg(e)))
    }
  }

const getCurrentUser = (): AppThunk =>
  async function (dispatch) {
    dispatch(getCurrentUserRequest())
    try {
      let res = await usersApi.getCurrentUser()
      dispatch(getCurrentUserSuccess(res))
    } catch (e) {
      dispatch(getCurrentUserFailure(defaultErrMsg(e)))
    }
  }

const updateUser = (user: UpdateUserRequestBody): AppThunk =>
  async function (dispatch) {
    dispatch(updateUserRequest())
    try {
      let res = await usersApi.updateUser(user)
      dispatch(updateUserSuccess(res))
    } catch (e) {
      dispatch(updateUserFailure(defaultErrMsg(e)))
    }
  }

export { login, signup, getCurrentUser, updateUser }
