import { createSlice, combineReducers } from '@reduxjs/toolkit'
import { users } from 'api/api'
import type { User } from 'api/api'
import { createAsyncThunkReducer } from 'app/utils'
import type { AsyncReturnType } from 'app/utils'

const { asyncThunk: login, reducer: loginReducer } = createAsyncThunkReducer<
  AsyncReturnType<typeof users.login>,
  Parameters<typeof users.login>[0]
>('user/login', users.login)

const { asyncThunk: signup, reducer: signupReducer } = createAsyncThunkReducer<
  AsyncReturnType<typeof users.signup>,
  Parameters<typeof users.signup>[0]
>('user/signup', users.signup)

const {
  asyncThunk: updateOne,
  reducer: updateOneReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof users.updateOne>,
  Parameters<typeof users.updateOne>[0]
>('user/updateOne', users.updateOne)

const {
  asyncThunk: getCurrent,
  reducer: getCurrentReducer,
} = createAsyncThunkReducer<AsyncReturnType<typeof users.getCurrent>>(
  'user/getCurrent',
  users.getCurrent
)

interface InitialState {
  user: User
}
const initialState: InitialState = {
  user: {} as User,
}
const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user
    })
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload.user
    })
    builder.addCase(getCurrent.fulfilled, (state, action) => {
      state.user = action.payload.user
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
