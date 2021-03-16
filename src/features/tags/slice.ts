import { createSlice, combineReducers } from '@reduxjs/toolkit'
import { tags } from 'api/api'
import { createApiAsyncThunkWithNoArg, createExtraReducer } from 'app/utils'

const getMany = createApiAsyncThunkWithNoArg(tags.getMany, 'tags/getMany')
const getManyReducer = createExtraReducer(getMany)

const tagsSlice = createSlice({
  name: 'tags',
  initialState: { tags: [] } as { tags: string[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMany.fulfilled, (state, { payload }) => {
      state.tags = payload.tags
    })
  },
})
export const tagsReducer = combineReducers({
  data: tagsSlice.reducer,
  getMany: getManyReducer,
})
export { getMany }
