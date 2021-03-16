import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { RootState } from 'app/store'
import {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getFeeds,
  favoriteOne,
  unfavoriteOne,
} from 'features/articles/slice'

const articlesSelector = (state: RootState) => state.articles.data

export function useGetArticles() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.articles.getMany)
  const { articles, getArticlesFilter, offset, limit } = useAppSelector(
    articlesSelector
  )
  useEffect(() => {
    dispatch(getMany({ ...getArticlesFilter, offset, limit }))
  }, [dispatch, getArticlesFilter, offset, limit])
  return {
    articles,
    loading,
    errors,
  }
}
export function useGetArticle() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.articles.getOne)
  const { article, slug } = useAppSelector(articlesSelector)
  useEffect(() => {
    if (slug) dispatch(getOne(slug))
  }, [dispatch, slug])
  return {
    article,
    loading,
    errors,
  }
}
export function useCreateArticle() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector(
    (state) => state.articles.createOne
  )
  return {
    createArticle: (params: Parameters<typeof createOne>[0]) =>
      dispatch(createOne(params)),
    loading,
    errors,
  }
}
export function useUpdateArticle() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector(
    (state) => state.articles.updateOne
  )
  return {
    updateArticle: (params: Parameters<typeof updateOne>[0]) =>
      dispatch(updateOne(params)),
    loading,
    errors,
  }
}
export function useDeleteArticle() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector(
    (state) => state.articles.deleteOne
  )
  return {
    deleteArticle: (params: Parameters<typeof deleteOne>[0]) =>
      dispatch(deleteOne(params)),
    loading,
    errors,
  }
}
export function useGetFeeds() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.articles.getFeeds)
  const { feeds, offset, limit } = useAppSelector(articlesSelector)
  useEffect(() => {
    dispatch(getFeeds({ offset, limit }))
  }, [dispatch, offset, limit])
  return {
    feeds,
    loading,
    errors,
  }
}
export function useFavoriteArticle() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector(
    (state) => state.articles.favoriteOne
  )
  return {
    favoriteArticle: (params: Parameters<typeof deleteOne>[0]) =>
      dispatch(favoriteOne(params)),
    loading,
    errors,
  }
}
export function useUnfavoriteArticle() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector(
    (state) => state.articles.unfavoriteOne
  )
  return {
    unfavoriteArticle: (params: Parameters<typeof deleteOne>[0]) =>
      dispatch(unfavoriteOne(params)),
    loading,
    errors,
  }
}
