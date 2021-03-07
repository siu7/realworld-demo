import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from 'react'
import {
  listArticles,
  feedArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getComments,
  deleteComment,
  favoriteArticle,
  unfavoriteArticle,
} from 'features/articles/slice'

function useListArticles() {
  const dispatch = useAppDispatch()
  const { articles, listArticlesloading } = useAppSelector(
    (state) => state.articles
  )
  useEffect(() => {
    dispatch(listArticles())
  }, [])

  return {
    articles,
    listArticlesloading,
  }
}

function useFeedArticles() {
  const dispatch = useAppDispatch()
  const { articles, feedArticlesloading } = useAppSelector(
    (state) => state.articles
  )
  useEffect(() => {
    dispatch(feedArticles())
  }, [])

  return {
    articles,
    feedArticlesloading,
  }
}

export { useListArticles, useFeedArticles }
