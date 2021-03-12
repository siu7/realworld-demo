import { users } from 'api/api'
import type { LoginBody, UserResponse } from 'api/api'
import { createApiAsyncThunkSlice } from 'app/utils'

const loginSlice = createApiAsyncThunkSlice<UserResponse, LoginBody>({
  name: 'user/login',
  initialState: {},
  api: users.login,
  reducers: undefined,
})
export default loginSlice.slice.reducer
export const login = loginSlice.asyncThunk

//interface Login {
//data?: UserResponse
//error?: string
//loading: boolean
//}

//const loginSlice = createSlice({
//name: 'login',
//initialState: { loading: false } as Login,
//reducers: {
//loginPending(state) {
//state.loading = true
//},
//loginFullfiled(state, { payload }) {
//state.data = payload
//state.loading = false
//},
//loginRejected(state, { payload }) {
//state.error = payload
//state.loading = false
//},
//},
//})

//const { loginPending, loginFullfiled, loginRejected } = loginSlice.actions
//export default loginSlice.reducer
//export const login = (body: LoginBody): AppThunk =>
//async function (dispatch) {
//try {
//dispatch(loginPending())
//const result = await users.login(body)
//dispatch(loginFullfiled(result))
//} catch (e) {
//dispatch(loginRejected(errorMsg(e)))
//}
//}

//const loginSliceThunk = createGenericSliceThunk({
//name: 'user/login',
//api: users.login,
//reducers: {},
//initialState: {} as GenericState<UserResponse>,
//})
//console.log(loginSliceThunk)
//export const loginTestReducer = loginSliceThunk.slice.reducer
//export const loginTest = loginSliceThunk.thunk

////console.log(loginTest)
