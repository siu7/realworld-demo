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
