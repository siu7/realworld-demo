import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import type { Profile, ProfileResponse } from 'api/profiles'
import { profilesApi } from 'api/profiles'
import { defaultErrMsg } from 'api/config'
import { tokenSelector } from 'features/user/selectors'

function initState(): void {
  let { pathname } = window.location
  let split = pathname.split('/')
  let page = split[1]
  let value = split[2]
  if (split.length > 2) {
    // /profile/:username
    if (page === 'profile') {
      initialState.username = value
    }
  }
}

interface ProfileState {
  profile?: Profile
  username?: string
  getProfileLoading: boolean
  followUserLoading: boolean
  unfollowUserLoading: boolean
}

let initialState: ProfileState = {
  getProfileLoading: false,
  followUserLoading: false,
  unfollowUserLoading: false,
}
initState()
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
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
  async function (dispatch, getState) {
    try {
      dispatch(getProfileRequest())
      let token = tokenSelector(getState())
      let res = await profilesApi.getProfile(username, token)
      dispatch(getProfileSuccess(res))
    } catch (e) {
      dispatch(getProfileFailure(defaultErrMsg(e)))
    }
  }

const followUser = (username: string): AppThunk =>
  async function (dispatch, getState) {
    try {
      dispatch(followUserRequest())
      let token = tokenSelector(getState())
      if (token) {
        let res = await profilesApi.followUser(username, token)
        dispatch(followUserSuccess(res))
      }
    } catch (e) {
      dispatch(followUserFailure(defaultErrMsg(e)))
    }
  }

const unfollowUser = (username: string): AppThunk =>
  async function (dispatch, getState) {
    try {
      dispatch(unfollowUserRequest())
      let token = tokenSelector(getState())
      if (token) {
        let res = await profilesApi.unfollowUser(username, token)
        dispatch(unfollowUserSuccess(res))
      }
    } catch (e) {
      dispatch(unfollowUserFailure(defaultErrMsg(e)))
    }
  }

export { getProfile, followUser, unfollowUser }
