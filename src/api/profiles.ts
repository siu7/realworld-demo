import { api } from './config'

interface Profile {
  username: string
  bio: string
  image: string
  following: boolean
}

interface ProfileResponse {
  profile: Profile
}

export type { Profile, ProfileResponse }

let wretch = api.url('/profiles')

const getProfile = async (username: string): Promise<ProfileResponse> =>
  await wretch.url(`/${username}`).get().json()

const followUser = async (username: string): Promise<ProfileResponse> =>
  await wretch.url(`/${username}/follow`).post().json()

const unfollowUser = async (username: string): Promise<ProfileResponse> =>
  await wretch.url(`/${username}/follow`).delete().json()

export const profilesApi = {
  getProfile,
  followUser,
  unfollowUser,
}
