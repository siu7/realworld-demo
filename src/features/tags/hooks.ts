import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { RootState } from 'app/store'
import { getMany } from 'features/tags/slice'

const tagsSelector = (state: RootState) => state.tags.data
export function useGetTags() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.tags.getMany)
  const { tags } = useAppSelector(tagsSelector)
  useEffect(() => {
    dispatch(getMany())
  }, [dispatch])
  return {
    tags,
    loading,
    errors,
  }
}
