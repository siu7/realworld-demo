import { createSlice, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import type {
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'
import { errorMsg } from 'api/api'

export type AsyncReturnType<
  T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any

export interface GenericState<T> {
  loading?: boolean
  data?: T
  error?: string
}

export const createApiAsyncThunk = <Returned, Args = void>(
  name: string,
  api: (...args: any[]) => Promise<Returned>
) =>
  createAsyncThunk<Returned, Args, {}>(
    name,
    async (params: Args, { rejectWithValue }) => {
      try {
        return params !== null ? await api(params) : await api()
      } catch (e) {
        return rejectWithValue(errorMsg(e))
      }
    }
  )

interface DefaultAppThunkState {
  loading?: boolean
  error?: string
}
export const createAsyncThunkReducer = <Returned, Args = void>(
  name: string,
  api: (...args: any[]) => Promise<Returned>
) => {
  const asyncThunk = createApiAsyncThunk<Returned, Args>(name, api)
  const reducer = createReducer({} as DefaultAppThunkState, (builder) => {
    builder.addCase(asyncThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(asyncThunk.fulfilled, (state) => {
      delete state.loading
    })
    builder.addCase(asyncThunk.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.error = payload
      delete state.loading
    })
  })
  return {
    asyncThunk,
    reducer,
  }
}

export function createApiAsyncThunkSlice<Returned, Args = void>({
  name,
  initialState = { loading: false },
  api,
  reducers,
}: {
  name: string
  initialState: GenericState<Returned>
  api: (...args: any[]) => Promise<Returned>
  reducers?: ValidateSliceCaseReducers<
    GenericState<Returned>,
    SliceCaseReducers<GenericState<Returned>>
  >
  params?: Args
}) {
  const asyncThunk = createApiAsyncThunk<Returned, Args>(name, api)
  const slice = createSlice({
    name,
    initialState,
    reducers: { ...reducers },
    extraReducers: (builder) => {
      builder.addCase(asyncThunk.pending, (state) => {
        state.loading = true
      })
      builder.addCase(asyncThunk.fulfilled, (state, { payload }) => {
        state.data = payload as any
        state.loading = false
      })
      builder.addCase(asyncThunk.rejected, (state, { payload }) => {
        if (typeof payload === 'string') state.error = payload
        state.loading = false
      })
    },
  })
  return {
    asyncThunk,
    slice,
  }
}

//export const createGenericSlice = <
//T,
//Reducers extends SliceCaseReducers<GenericState<T>>
//>(
//name: string,
//initialState: GenericState<T> = { loading: false },
//reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
//) =>
//createSlice({
//name,
//initialState,
//reducers: {
//request(state) {
//state.loading = true
//},
//failure(state: GenericState<T>, action: PayloadAction<string>) {
//state.error = action.payload
//state.loading = false
//},
//success(state: GenericState<T>, action: PayloadAction<T>) {
//state.data = action.payload
//state.loading = false
//},
//...reducers,
//},
//})

//export const createGenericAppThunk = <T, Args>(
//api: (...args: any[]) => Promise<T>,
//request: any,
//success: any,
//failure: any
//): Function => (params: Args): AppThunk =>
//async function (dispatch) {
//try {
//dispatch(request())
//const result = params ? await api(params) : await api()
//dispatch(success(result))
//} catch (e) {
//dispatch(failure(errorMsg(e)))
//}
//}

//export function createGenericSliceThunk<
//T,
//Args,
//Reducers extends SliceCaseReducers<GenericState<T>>
//>({
//name,
//api,
//reducers,
//initialState = { loading: false },
//}: {
//name: string
//api: (...args: any[]) => Promise<T>
//reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
//initialState: GenericState<T>
//}) {
//const slice = createGenericSlice(name, initialState, reducers)
//const { request, success, failure } = slice.actions
//const thunk = createGenericAppThunk<T, Args>(api, request, success, failure)
//return {
//slice,
//thunk,
//}
//}
