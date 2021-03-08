import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getTags } from 'features/tags/slice'

function useGetTags() {
  const dispatch = useAppDispatch()
  const { tags, getTagsLoading } = useAppSelector((state) => state.tags)

  useEffect(() => {
    dispatch(getTags())
  }, [dispatch])

  return {
    tags,
    getTagsLoading,
  }
}

export { useGetTags }
