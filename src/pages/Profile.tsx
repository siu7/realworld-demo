import { useEffect, useState } from 'react'
import { useRoute, useLocation } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getOne } from 'features/profile/slice'
import {
  getArticlesByAuthor,
  getArticlesByFavorited,
  setSelectedTabType,
} from 'features/articles/slice'
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

  const { articlesByAuthor, articlesByFavorited, limit } = useAppSelector(
    (state) => state.articles.data
  )
  useEffect(() => {
    if (usernameFromUrl) {
      dispatch(
        getArticlesByAuthor({
          author: usernameFromUrl,
          offset: articlesByAuthor.offset,
          limit,
        })
      )
    }
  }, [dispatch, usernameFromUrl, articlesByAuthor.offset, limit])

  useEffect(() => {
    if (usernameFromUrl) {
      dispatch(
        getArticlesByFavorited({
          favorited: usernameFromUrl,
          offset: articlesByFavorited.offset,
          limit,
        })
      )
    }
  }, [dispatch, usernameFromUrl, articlesByFavorited.offset, limit])

  const { articleTabs } = useAppSelector((state) => state.articles.data)
  let activeTabs = articleTabs.find((tab) => tab.active === true)
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
        <ArticlesList
          articlesSet={
            activeTabs?.type === 'author'
              ? articlesByAuthor
              : articlesByFavorited
          }
        />
      </div>
    </div>
  )
}
