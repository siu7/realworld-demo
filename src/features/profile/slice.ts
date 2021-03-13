import { createSlice, combineReducers } from '@reduxjs/toolkit'
import { profiles } from 'api/api'
import type { Profile } from 'api/api'
import { createAsyncThunkReducer } from 'app/utils'
import type { AsyncReturnType } from 'app/utils'

const { asyncThunk: getOne, reducer: getOneReducer } = createAsyncThunkReducer<
  AsyncReturnType<typeof profiles.getOne>,
  Parameters<typeof profiles.getOne>[0]
>('profile/getOne', profiles.getOne)

const {
  asyncThunk: followOne,
  reducer: followOneReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof profiles.followOne>,
  Parameters<typeof profiles.followOne>[0]
>('profile/followOne', profiles.followOne)

const {
  asyncThunk: unfollowOne,
  reducer: unfollowOneReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof profiles.unfollowOne>,
  Parameters<typeof profiles.unfollowOne>[0]
>('profile/unfollowOne', profiles.unfollowOne)

const profileSlice = createSlice({
  name: 'profile',
  initialState: { profile: {}, username: null } as {
    profile: Profile
    username: string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOne.fulfilled, (state, action) => {
      state.profile = action.payload.profile
    })
    builder.addCase(followOne.fulfilled, (state, action) => {
      state.profile = action.payload.profile
    })
    builder.addCase(unfollowOne.fulfilled, (state, action) => {
      state.profile = action.payload.profile
    })
  },
})

export const profileReducer = combineReducers({
  data: profileSlice.reducer,
  getOne: getOneReducer,
  followOne: followOneReducer,
  unfollowOne: unfollowOneReducer,
})
export { getOne, followOne, unfollowOne }
