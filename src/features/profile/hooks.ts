import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { RootState } from 'app/store'
import { getOne, followOne, unfollowOne } from 'features/profile/slice'

const profileSelector = (state: RootState) => state.profile.data

export function useGetProfile() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.profile.getOne)
  const { profile, username } = useAppSelector(profileSelector)
  useEffect(() => {
    if (username) dispatch(getOne(username))
  }, [dispatch])
  return {
    profile,
    loading,
    errors,
  }
}
export function useFollowOne() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.profile.followOne)
  return {
    followUser: (params: Parameters<typeof followOne>[0]) =>
      dispatch(followOne(params)),
    loading,
    errors,
  }
}
export function useUnfollowOne() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector(
    (state) => state.profile.unfollowOne
  )
  return {
    unfollowUser: (params: Parameters<typeof unfollowOne>[0]) =>
      dispatch(unfollowOne(params)),
    loading,
    errors,
  }
}
