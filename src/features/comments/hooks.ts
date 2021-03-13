import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { RootState } from 'app/store'
import { getMany, createOne, deleteOne } from 'features/comments/slice'

const commentsSelector = (state: RootState) => state.comments.data

export function useGetComments() {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.comments.getMany)
  const { comments } = useAppSelector(commentsSelector)
  const { slug } = useAppSelector((state) => state.articles.data)
  useEffect(() => {
    if (slug) dispatch(getMany(slug))
  }, [dispatch])
  return {
    comments,
    loading,
    error,
  }
}
export function useCreateComment() {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.comments.createOne)
  return {
    createComment: (params: Parameters<typeof createOne>[0]) =>
      dispatch(createOne(params)),
    loading,
    error,
  }
}
export function useDeleteComment() {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.comments.deleteOne)
  return {
    deleteOne: (params: Parameters<typeof deleteOne>[0]) =>
      dispatch(deleteOne(params)),
    loading,
    error,
  }
}
