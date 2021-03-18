import { useLocation } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { isAuthedSelector } from 'features/user/selectors'
import { followOne, unfollowOne } from 'features/profile/slice'

export function FollowButton({
  following,
  username,
}: {
  following: boolean
  username: string
}) {
  const dispatch = useAppDispatch()
  const isAuthed = useAppSelector(isAuthedSelector)
  const [, setLocation] = useLocation()

  const { loading: followUserLoading } = useAppSelector(
    (state) => state.profile.followOne
  )
  const { loading: unfollowUserLoading } = useAppSelector(
    (state) => state.profile.unfollowOne
  )

  function handleFollow(username: string) {
    !isAuthed
      ? setLocation('/signup')
      : !following
      ? dispatch(followOne(username))
      : dispatch(unfollowOne(username))
  }
  return (
    <button
      disabled={followUserLoading || unfollowUserLoading}
      onClick={() => handleFollow(username)}
    >
      {following ? 'Unfollow' : 'Follow'} {username}
    </button>
  )
}
