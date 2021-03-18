import { createSlice, combineReducers } from '@reduxjs/toolkit'
import { profiles } from 'api/api'
import type { Profile } from 'api/api'
import { createApiAsyncThunk, createExtraReducer } from 'app/utils'

const getOne = createApiAsyncThunk(profiles.getOne, 'profile/getOne')
const getOneReducer = createExtraReducer(getOne)

const followOne = createApiAsyncThunk(profiles.followOne, 'profile/followOne')
const followOneReducer = createExtraReducer(followOne)

const unfollowOne = createApiAsyncThunk(
  profiles.unfollowOne,
  'profile/unfollowOne'
)
const unfollowOneReducer = createExtraReducer(unfollowOne)

const profileSlice = createSlice({
  name: 'profile',
  initialState: { profile: {} } as {
    profile: Profile
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOne.fulfilled, (state, { payload }) => {
      state.profile = payload.profile
    })
    builder.addCase(followOne.fulfilled, (state, { payload }) => {
      state.profile = payload.profile
    })
    builder.addCase(unfollowOne.fulfilled, (state, { payload }) => {
      state.profile = payload.profile
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
