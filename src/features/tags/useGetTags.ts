import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { tagsThunk } from 'features/tags/slices'

function useGetTags() {
  const dispatch = useAppDispatch()
  const { tags } = useAppSelector((state) => state.tags)

  useEffect(() => {
    dispatch(tagsThunk.list())
  }, [dispatch])

  return {
    tags,
  }
}

export { useGetTags }
