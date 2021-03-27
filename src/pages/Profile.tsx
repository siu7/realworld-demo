import { useEffect } from 'react'
import { useRoute, Link } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getOne } from 'features/profile/slice'
import { getMany, unsetArticle } from 'features/articles/slice'
import { FollowButton } from 'components/FollowButton'
import { ArticlesList } from 'components/ArticlesList'
import styles from './Profile.module.css'
import { ArticlesTab } from 'components/ArticlesTab'
import { Avatar } from 'components/Avatar'

export default function Profile() {
  const dispatch = useAppDispatch()
  const [, params1] = useRoute('/profile/:username')
  const [, params2] = useRoute('/profile/:username/favorites')
  const usernameFromUrl = params1?.username || params2?.username
  const { user } = useAppSelector((state) => state.user.data)
  const selfProfile = user?.username === usernameFromUrl

  useEffect(() => {
    if (usernameFromUrl && !selfProfile) {
      dispatch(getOne(usernameFromUrl))
    }
  }, [dispatch, usernameFromUrl, selfProfile])

  const { articleTabs } = useAppSelector((state) => state.articles.data)
  let activeTab = articleTabs.find((tab) => tab.active === true)
  const { limit, offset } = useAppSelector((state) => state.articles.data)
  useEffect(() => {
    if (usernameFromUrl) {
      if (activeTab?.type === 'author') {
        dispatch(getMany({ author: usernameFromUrl, offset, limit }))
      }
      if (activeTab?.type === 'favorited') {
        dispatch(getMany({ favorited: usernameFromUrl, offset, limit }))
      }
    }
  }, [dispatch, usernameFromUrl, offset, limit, activeTab?.type])

  const { profile } = useAppSelector((state) => state.profile.data)
  const { loading } = useAppSelector((state) => state.profile.getOne)

  useEffect(() => {
    return () => {
      dispatch(unsetArticle())
    }
  }, [])
  //const { username, following, bio } = profile
  let username = selfProfile ? user?.username : profile.username
  let bio = selfProfile ? user?.bio : profile.bio
  return (
    <div>
      <div className={styles.banner}>
        {selfProfile && user ? (
          <Avatar
            username={user?.username}
            imageUrl={user?.image || ''}
            variant="large"
          />
        ) : (
          <Avatar
            username={profile.username}
            imageUrl={profile.image || ''}
            variant="large"
          />
        )}
        <h4>{!loading ? username : 'loading...'}</h4>
        {bio && <p>{bio}</p>}
        {selfProfile && user ? (
          <Link to="/settings">
            <button className={styles.settingsButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              Edit Profile Settings
            </button>
          </Link>
        ) : (
          <FollowButton
            following={profile.following}
            username={profile.username}
          />
        )}
      </div>
      <div className="container">
        <ArticlesTab />
        <ArticlesList />
      </div>
    </div>
  )
}
