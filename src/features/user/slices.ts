import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import type { User, LoginBody, SignupBody, PutUserBody } from 'api/api'
import { users } from 'api/api'

function initState(): void {
  let result = localStorage.getItem('@token')
  if (result) {
    initialState.token = result
    initialState.authed = true
  }
}
function saveUser(user: User) {
  localStorage.setItem('user', JSON.stringify(user))
}
//function removeUser() {
//localStorage.removeItem('user')
//}

interface UserState {
  user?: User
  token?: string
  authed: boolean
}
let initialState: UserState = {
  authed: false,
}
initState()

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReq() {},
    loginOk(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.token = action.payload.token
      state.authed = true
    },
    loginErr(_, _e) {},

    signupReq() {},
    signupOk(state, action: PayloadAction<User>) {
      state.user = action.payload
      state.token = action.payload.token
      state.authed = true
    },
    signupErr(_, _e) {},

    getReq() {},
    getOk(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    getErr(_, _e) {},

    putReq() {},
    putOk(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    putErr(_, _e) {},
  },
})

export default usersSlice.reducer

const { actions } = usersSlice
const login = (body: LoginBody): AppThunk =>
  async function (dispatch) {
    const { loginReq, loginOk, loginErr } = actions
    try {
      dispatch(loginReq())
      let res = await users.login(body)
      dispatch(loginOk(res.user))
      saveUser(res.user)
    } catch (e) {
      dispatch(loginErr(e))
    }
  }
const signup = (body: SignupBody): AppThunk =>
  async function (dispatch) {
    const { signupReq, signupOk, signupErr } = actions
    try {
      dispatch(signupReq())
      let res = await users.signup(body)
      dispatch(signupOk(res.user))
      saveUser(res.user)
    } catch (e) {
      dispatch(signupErr(e))
    }
  }
const get = (): AppThunk =>
  async function (dispatch) {
    const { getReq, getOk, getErr } = actions
    try {
      dispatch(getReq())
      let res = await users.get()
      dispatch(getOk(res.user))
    } catch (e) {
      dispatch(getErr(e))
    }
  }
const put = (body: PutUserBody): AppThunk =>
  async function (dispatch) {
    const { putReq, putOk, putErr } = actions
    try {
      dispatch(putReq())
      let res = await users.put(body)
      dispatch(putOk(res.user))
    } catch (e) {
      dispatch(putErr(e))
    }
  }

export const usersThunk = { login, signup, get, put }
