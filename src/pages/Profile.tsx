import { useEffect } from 'react'
import { useRoute } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getOne } from 'features/profile/slice'
import { getMany } from 'features/articles/slice'
import { FollowButton } from 'components/FollowButton'
import { ArticlesList } from 'components/ArticlesList'
import styles from './Profile.module.css'
import { ArticlesTab } from 'components/ArticlesTab'

export default function Profile() {
  const dispatch = useAppDispatch()
  const [, params1] = useRoute('/profile/:username')
  const [, params2] = useRoute('/profile/:username/favorites')
  const usernameFromUrl = params1?.username || params2?.username

  useEffect(() => {
    if (usernameFromUrl) {
      dispatch(getOne(usernameFromUrl))
    }
  }, [dispatch, usernameFromUrl])

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
  const { username, following, image, bio } = profile
  return (
    <div>
      <div className={styles.banner}>
        <img src={!loading ? image : ''} className={styles.avatar} alt="" />
        <h4>{!loading ? username : 'loading...'}</h4>
        {bio && <p>{bio}</p>}
        <FollowButton following={following} username={username} />
      </div>
      <div className="container">
        <ArticlesTab />
        <ArticlesList />
      </div>
    </div>
  )
}
