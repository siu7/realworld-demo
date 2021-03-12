import { tags } from 'api/api'
import type { TagsResponse } from 'api/api'
import { createApiAsyncThunkSlice } from 'app/utils'

const getTagsSlice = createApiAsyncThunkSlice<TagsResponse>({
  name: 'tags/getTags',
  api: tags.get,
  initialState: {},
  reducers: undefined,
})
export default getTagsSlice.slice.reducer
export const getTags = getTagsSlice.asyncThunk
