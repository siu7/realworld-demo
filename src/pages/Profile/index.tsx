import { useEffect, useState } from 'react'
import { useRoute, useLocation } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getOne } from 'features/profile/slice'
import {
  getArticlesByAuthor,
  getArticlesByFavorited,
} from 'features/articles/slice'
import { FollowButton } from 'components/FollowButton'
import { ArticlesList } from 'components/ArticlesList'

export default function Profile() {
  const dispatch = useAppDispatch()
  const [, params1] = useRoute('/profile/:username')
  const [matchFavorites, params2] = useRoute('/profile/:username/favorites')
  const params = params1 || params2
  const [, setLocation] = useLocation()
  const [didLoad, setDidLoad] = useState(false)

  const { profile } = useAppSelector((state) => state.profile.data)
  useEffect(() => {
    if (params?.username && !didLoad) {
      dispatch(getOne(params.username))
    }
  }, [dispatch, params?.username, didLoad])

  const { articlesByAuthor, articlesByFavorited } = useAppSelector(
    (state) => state.articles.data
  )
  useEffect(() => {
    if (params?.username && !didLoad) {
      dispatch(getArticlesByAuthor({ author: params.username }))
    }
  }, [dispatch, params?.username, didLoad])

  useEffect(() => {
    if (params?.username && !didLoad) {
      dispatch(getArticlesByFavorited({ favorited: params.username }))
    }
  }, [dispatch, params?.username, didLoad])

  const { username, following, image, bio } = profile
  function handleTabClick(username: string, isFavTab: boolean) {
    setDidLoad(true)
    isFavTab
      ? setLocation(`/profile/${username}/favorites`)
      : setLocation(`/profile/${username}`)
  }

  return (
    <div>
      <div>
        <img src={image} alt="avatar" />
        <h4>{username}</h4>
        {bio && <p>{bio}</p>}
        <FollowButton following={following} username={username} />
      </div>
      <button onClick={() => handleTabClick(username, false)}>Home</button>
      <button onClick={() => handleTabClick(username, true)}>Favorites</button>
      {matchFavorites ? (
        <ArticlesList articles={articlesByFavorited} />
      ) : (
        <ArticlesList articles={articlesByAuthor} />
      )}
    </div>
  )
}
