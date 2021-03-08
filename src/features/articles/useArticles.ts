import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from 'react'
import {
  setListArticlesParams,
  setLimit,
  setOffset,
  resetArticles,
} from 'features/articles/slice'
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
import type {
  CreateArticleRequestBody,
  UpdateArticleRequestBody,
} from 'api/articles'

function useListArticles() {
  const dispatch = useAppDispatch()
  const {
    articles,
    listArticlesloading,
    listArticlesParams,
    limit,
    offset,
  } = useAppSelector((state) => state.articles)

  useEffect(() => {
    let params = { ...listArticlesParams, limit, offset }
    dispatch(listArticles(params))
  }, [dispatch, listArticlesParams, limit, offset])

  return {
    articles,
    listArticlesloading,
  }
}

function useFeedArticles() {
  const dispatch = useAppDispatch()
  const { articles, feedArticlesloading, limit, offset } = useAppSelector(
    (state) => state.articles
  )
  useEffect(() => {
    let params = { limit, offset }
    dispatch(resetArticles())
    dispatch(feedArticles(params))
  }, [dispatch, limit, offset])

  return {
    articles,
    feedArticlesloading,
  }
}

function useArticlesParams() {
  const dispatch = useAppDispatch()
  const { listArticlesParams } = useAppSelector((state) => state.articles)

  function removeParam(key: 'tag' | 'author' | 'favorited') {
    let tmp = Object.assign({}, listArticlesParams)
    delete tmp[key]
    dispatch(setListArticlesParams(tmp))
  }
  const removeTag = () => removeParam('tag')
  const removeAuthor = () => removeParam('author')
  const removeFavorited = () => removeParam('favorited')

  function addParam(key: 'tag' | 'author' | 'favorited', value: string) {
    let tmp = Object.assign({}, listArticlesParams)
    tmp[key] = value
    dispatch(setListArticlesParams(tmp))
  }
  const addTag = (tag: string) => addParam('tag', tag)
  const addAuthor = (author: string) => addParam('author', author)
  const addFavorited = (favorited: string) => addParam('favorited', favorited)

  return {
    setLimit: (limit: number) => dispatch(setLimit(limit)),
    setOffset: (limit: number) => dispatch(setOffset(limit)),
    removeTag,
    removeAuthor,
    removeFavorited,
    addTag,
    addAuthor,
    addFavorited,
  }
}

function useGetArticle() {
  const dispatch = useAppDispatch()
  const { article, getArticleLoading, slug } = useAppSelector(
    (state) => state.articles
  )
  useEffect(() => {
    if (slug) dispatch(getArticle(slug))
  }, [dispatch, slug])

  return {
    article,
    getArticleLoading,
  }
}

function useCreateArticle() {
  const dispatch = useAppDispatch()
  const { createArticleLoading } = useAppSelector((state) => state.articles)

  return {
    createArticleLoading,
    createArticle: (article: CreateArticleRequestBody) =>
      dispatch(createArticle(article)),
  }
}

function useUpdateArticle() {
  const dispatch = useAppDispatch()
  const { updateArticleLoading } = useAppSelector((state) => state.articles)

  return {
    updateArticleLoading,
    updateArticle: (slug: string, article: UpdateArticleRequestBody) =>
      dispatch(updateArticle(slug, article)),
  }
}

function useDeleteArticle() {
  const dispatch = useAppDispatch()
  const { deleteArticleLoading } = useAppSelector((state) => state.articles)

  return {
    deleteArticleLoading,
    deleteArticle: (slug: string) => dispatch(deleteArticle(slug)),
  }
}

function useGetComments() {
  const dispatch = useAppDispatch()
  const { comments, getCommentsLoading, slug } = useAppSelector(
    (state) => state.articles
  )
  useEffect(() => {
    if (slug) dispatch(getComments(slug))
  }, [dispatch, slug])

  return {
    comments,
    getCommentsLoading,
  }
}

function useDeleteComment() {
  const dispatch = useAppDispatch()
  const { deleteCommentLoading } = useAppSelector((state) => state.articles)

  return {
    deleteCommentLoading,
    deleteComment: (slug: string, id: number) =>
      dispatch(deleteComment(slug, id)),
  }
}

function useFavoriteArticle() {
  const dispatch = useAppDispatch()
  const { favoriteArticleLoading } = useAppSelector((state) => state.articles)

  return {
    favoriteArticleLoading,
    favoriteArticle: (slug: string) => dispatch(favoriteArticle(slug)),
  }
}

function useUnfavoriteArticle() {
  const dispatch = useAppDispatch()
  const { unfavoriteArticleLoading } = useAppSelector((state) => state.articles)

  return {
    unfavoriteArticleLoading,
    unfavoriteArticle: (slug: string) => dispatch(unfavoriteArticle(slug)),
  }
}

export {
  useListArticles,
  useFeedArticles,
  useArticlesParams,
  useGetArticle,
  useCreateArticle,
  useUpdateArticle,
  useDeleteArticle,
  useGetComments,
  useDeleteComment,
  useFavoriteArticle,
  useUnfavoriteArticle,
}
