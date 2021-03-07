import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import type { TagsResponse } from 'api/tags'
import { tagsApi } from 'api/tags'
import { defaultErrMsg } from 'api/config'

interface TagsState {
  tags: [string] | []
  getTagsLoading: boolean
}

const initialState: TagsState = {
  tags: [],
  getTagsLoading: false,
}
const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    getTagsRequest(state) {
      state.getTagsLoading = true
    },
    getTagsSuccess(state, action: PayloadAction<TagsResponse>) {
      state.tags = action.payload.tags
      state.getTagsLoading = false
    },
    getTagsFailure(state, _action: PayloadAction<string>) {
      state.getTagsLoading = false
    },
  },
})

const { getTagsRequest, getTagsSuccess, getTagsFailure } = tagsSlice.actions
export default tagsSlice.reducer

const getTags = (): AppThunk =>
  async function (dispatch) {
    dispatch(getTagsRequest())
    try {
      let res = await tagsApi.getTags()
      dispatch(getTagsSuccess(res))
    } catch (e) {
      dispatch(getTagsFailure(defaultErrMsg(e)))
    }
  }

export { getTags }
