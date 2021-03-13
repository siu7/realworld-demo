import { createSlice, combineReducers } from '@reduxjs/toolkit'
import { tags } from 'api/api'
import { createAsyncThunkReducer } from 'app/utils'
import type { AsyncReturnType } from 'app/utils'

const {
  asyncThunk: getMany,
  reducer: getManyReducer,
} = createAsyncThunkReducer<AsyncReturnType<typeof tags.getMany>>(
  'tags/getMany',
  tags.getMany
)

const tagsSlice = createSlice({
  name: 'tags',
  initialState: { tags: [] } as { tags: string[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMany.fulfilled, (state, action) => {
      state.tags = action.payload.tags
    })
  },
})
export const tagsReducer = combineReducers({
  data: tagsSlice.reducer,
  getMany: getManyReducer,
})
export { getMany }
