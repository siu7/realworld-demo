import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { RootState } from 'app/store'
import { getMany, createOne, deleteOne } from 'features/comments/slice'

const commentsSelector = (state: RootState) => state.comments.data

export function useGetComments() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.comments.getMany)
  const { comments } = useAppSelector(commentsSelector)
  return {
    getComments: (params: Parameters<typeof getMany>[0]) =>
      dispatch(getMany(params)),
    comments,
    loading,
    errors,
  }
}
export function useCreateComment() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector(
    (state) => state.comments.createOne
  )
  return {
    createComment: (params: Parameters<typeof createOne>[0]) =>
      dispatch(createOne(params)),
    loading,
    errors,
  }
}
export function useDeleteComment() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector(
    (state) => state.comments.deleteOne
  )
  return {
    deleteOne: (params: Parameters<typeof deleteOne>[0]) =>
      dispatch(deleteOne(params)),
    loading,
    errors,
  }
}
