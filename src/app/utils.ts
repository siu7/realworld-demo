import type { AsyncThunk } from '@reduxjs/toolkit'
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { handleError } from 'api/api'

interface DefaultAppThunkState {
  loading?: boolean
  errors: { [key: string]: string[] }
}

export const createExtraReducer = <Returned, ThunkArg, ThunkApiConfig>(
  asyncThunk: AsyncThunk<
    Returned,
    ThunkArg,
    {
      rejectValue: { [key: string]: string[] }
    } & ThunkApiConfig
  >
) =>
  createReducer({} as DefaultAppThunkState, (builder) => {
    builder.addCase(asyncThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(asyncThunk.fulfilled, (state) => {
      delete state.loading
    })
    builder.addCase(asyncThunk.rejected, (state, { payload }) => {
      if (payload) state.errors = payload
      delete state.loading
    })
  })

export const createApiAsyncThunk = <Returned, ThunkArg>(
  api: (...params: ThunkArg[]) => Promise<Returned>,
  name: string
) =>
  createAsyncThunk<
    Returned,
    ThunkArg,
    { rejectValue: { [key: string]: string[] } }
  >(name, async (params: ThunkArg, { rejectWithValue }) => {
    try {
      return await api(params)
    } catch (e) {
      return rejectWithValue(handleError(e))
    }
  })

export const createApiAsyncThunkWithNoArg = <Returned>(
  api: () => Promise<Returned>,
  name: string
) =>
  createAsyncThunk<
    Returned,
    void,
    { rejectValue: { [key: string]: string[] } }
  >(name, async (_, { rejectWithValue }) => {
    try {
      return await api()
    } catch (e) {
      return rejectWithValue(handleError(e))
    }
  })
