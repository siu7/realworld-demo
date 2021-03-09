import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import type { Profile } from 'api/api'
import { profiles } from 'api/api'

function initState(): void {
  let { pathname } = window.location
  let split = pathname.split('/')
  if (split.length > 2) {
    // /profile/:username
    if (split[1] === 'profile') initialState.username = split[2]
  }
}

interface ProfileState {
  profile?: Profile
  username?: string
}

let initialState: ProfileState = {}
initState()
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getReq() {},
    getOk(state, action: PayloadAction<Profile>) {
      state.profile = action.payload
    },
    getErr(_, _e) {},

    followReq() {},
    followOk(state, action: PayloadAction<Profile>) {
      state.profile = action.payload
    },
    followErr(_, _e) {},

    unfollowReq() {},
    unfollowOk(state, action: PayloadAction<Profile>) {
      state.profile = action.payload
    },
    unfollowErr(_, _e) {},
  },
})

export default profileSlice.reducer

const { actions } = profileSlice
const get = (username: string): AppThunk =>
  async function (dispatch) {
    const { getReq, getOk, getErr } = actions
    try {
      dispatch(getReq())
      let res = await profiles.get(username)
      dispatch(getOk(res.profile))
    } catch (e) {
      dispatch(getErr(e))
    }
  }

const follow = (username: string): AppThunk =>
  async function (dispatch) {
    const { followReq, followOk, followErr } = actions
    try {
      dispatch(followReq())
      let res = await profiles.follow(username)
      dispatch(followOk(res.profile))
    } catch (e) {
      dispatch(followErr(e))
    }
  }

const unfollow = (username: string): AppThunk =>
  async function (dispatch) {
    const { unfollowReq, unfollowOk, unfollowErr } = actions
    try {
      dispatch(unfollowReq())
      let res = await profiles.unfollow(username)
      dispatch(unfollowOk(res.profile))
    } catch (e) {
      dispatch(unfollowErr(e))
    }
  }

export const profilesThunk = { get, follow, unfollow }
