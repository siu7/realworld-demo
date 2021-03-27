import { useLocation } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { followOne, unfollowOne } from 'features/profile/slice'
import styles from './FollowButton.module.css'

export function FollowButton({
  following,
  username,
}: {
  following: boolean
  username: string
}) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user.data)
  const [, setLocation] = useLocation()

  const { loading: followUserLoading } = useAppSelector(
    (state) => state.profile.followOne
  )
  const { loading: unfollowUserLoading } = useAppSelector(
    (state) => state.profile.unfollowOne
  )

  function handleFollow(username: string) {
    !user
      ? setLocation('/signup')
      : !following
      ? dispatch(followOne(username))
      : dispatch(unfollowOne(username))
  }
  return (
    <button
      disabled={followUserLoading || unfollowUserLoading}
      onClick={() => handleFollow(username)}
      className={`${styles.button} ${following && styles.buttonFollowing}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      {following ? 'Unfollow' : 'Follow'} {username}
    </button>
  )
}
