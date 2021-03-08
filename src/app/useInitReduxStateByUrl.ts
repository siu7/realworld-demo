import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from 'app/hooks'
import { setSlug, setListArticlesParams } from 'features/articles/slice'
import { setUsername } from 'features/profile/slice'
import type { ListArticlesParams } from 'api/articles'

export function useInitReduxStateByUrl() {
  const [didLoad, setDidLoad] = useState(false)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const split = location.pathname.split('/')
  if (!didLoad) {
    setDidLoad(true)
    if (split.length === 3) {
      let value = split[2]
      // "/editor/article-slug-here", "/article/article-slug-here"
      if (split[1] === 'article' || split[1] === 'editor') {
        dispatch(setSlug(value))
      }
      // /profile/:username
      if (split[1].includes('profile')) {
        dispatch(setUsername(value))
        let tmp: ListArticlesParams = {
          author: value,
        }
        dispatch(setListArticlesParams(tmp))
      }
    }
    if (split.length === 4) {
      let value = split[2]
      // /profile/:username/favorites
      if (split[1] === 'profile' && split[3] === 'favorites') {
        let tmp: ListArticlesParams = {
          favorited: value,
        }
        dispatch(setListArticlesParams(tmp))
      }
    }
  }
}
