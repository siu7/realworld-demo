import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getProfile, followUser, unfollowUser } from 'features/profile/slice'

function useGetProfile() {
  const dispatch = useAppDispatch()
  const { profile, getProfileLoading, username } = useAppSelector(
    (state) => state.profile
  )

  useEffect(() => {
    if (username !== '') {
      dispatch(getProfile(username))
    }
  }, [username])

  return {
    profile,
    getProfileLoading,
  }
}

function useFollowUser() {
  const dispatch = useAppDispatch()
  const { followUserLoading } = useAppSelector((state) => state.profile)

  return {
    followUserLoading,
    followUser: (username: string) => dispatch(followUser(username)),
  }
}

function useUnfollowUser() {
  const dispatch = useAppDispatch()
  const { unfollowUserLoading } = useAppSelector((state) => state.profile)

  return {
    unfollowUserLoading,
    unfollowUser: (username: string) => dispatch(unfollowUser(username)),
  }
}

export { useGetProfile, useFollowUser, useUnfollowUser }
