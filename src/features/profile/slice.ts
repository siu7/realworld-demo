import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import type { Profile, ProfileResponse } from 'api/profiles'
import { profilesApi } from 'api/profiles'
import { defaultErrMsg } from 'api/config'

interface ProfileState {
  profile: Profile | null
  username: string
  getProfileLoading: boolean
  followUserLoading: boolean
  unfollowUserLoading: boolean
}

const initialState: ProfileState = {
  profile: null,
  username: '',
  getProfileLoading: false,
  followUserLoading: false,
  unfollowUserLoading: false,
}
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    getProfileRequest(state) {
      state.getProfileLoading = true
    },
    getProfileSuccess(state, action: PayloadAction<ProfileResponse>) {
      state.profile = action.payload.profile
      state.getProfileLoading = false
    },
    getProfileFailure(state, _action: PayloadAction<string>) {
      state.getProfileLoading = false
    },

    followUserRequest(state) {
      state.followUserLoading = true
    },
    followUserSuccess(state, action: PayloadAction<ProfileResponse>) {
      state.profile = action.payload.profile
      state.followUserLoading = false
    },
    followUserFailure(state, _action: PayloadAction<string>) {
      state.followUserLoading = false
    },

    unfollowUserRequest(state) {
      state.unfollowUserLoading = true
    },
    unfollowUserSuccess(state, action: PayloadAction<ProfileResponse>) {
      state.profile = action.payload.profile
      state.unfollowUserLoading = false
    },
    unfollowUserFailure(state, _action: PayloadAction<string>) {
      state.unfollowUserLoading = false
    },
  },
})

export const { setUsername } = profileSlice.actions

const {
  getProfileRequest,
  getProfileSuccess,
  getProfileFailure,
  followUserRequest,
  followUserSuccess,
  followUserFailure,
  unfollowUserRequest,
  unfollowUserSuccess,
  unfollowUserFailure,
} = profileSlice.actions
export default profileSlice.reducer

const getProfile = (username: string): AppThunk =>
  async function (dispatch) {
    dispatch(getProfileRequest())
    try {
      let res = await profilesApi.getProfile(username)
      dispatch(getProfileSuccess(res))
    } catch (e) {
      dispatch(getProfileFailure(defaultErrMsg(e)))
    }
  }

const followUser = (username: string): AppThunk =>
  async function (dispatch) {
    dispatch(followUserRequest())
    try {
      let res = await profilesApi.followUser(username)
      dispatch(followUserSuccess(res))
    } catch (e) {
      dispatch(followUserFailure(defaultErrMsg(e)))
    }
  }

const unfollowUser = (username: string): AppThunk =>
  async function (dispatch) {
    dispatch(unfollowUserRequest())
    try {
      let res = await profilesApi.unfollowUser(username)
      dispatch(unfollowUserSuccess(res))
    } catch (e) {
      dispatch(unfollowUserFailure(defaultErrMsg(e)))
    }
  }

export { getProfile, followUser, unfollowUser }
