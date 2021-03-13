import { createSlice, combineReducers } from '@reduxjs/toolkit'
import { comments } from 'api/api'
import type { Comment } from 'api/api'
import { createAsyncThunkReducer } from 'app/utils'
import type { AsyncReturnType } from 'app/utils'

const {
  asyncThunk: getMany,
  reducer: getManyReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof comments.getMany>,
  Parameters<typeof comments.getMany>[0]
>('comments/getMany', comments.getMany)

const {
  asyncThunk: createOne,
  reducer: createOneReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof comments.createOne>,
  Parameters<typeof comments.createOne>[0]
>('comments/createOne', comments.createOne)

const {
  asyncThunk: deleteOne,
  reducer: deleteOneReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof comments.deleteOne>,
  Parameters<typeof comments.deleteOne>[0]
>('comments/deleteOne', comments.deleteOne)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { comments: [] } as { comments: Comment[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMany.fulfilled, (state, action) => {
      state.comments = action.payload.comments
    })
    builder.addCase(createOne.fulfilled, (state, action) => {
      state.comments.push(action.payload.comment)
    })
  },
})

export const commentsReducer = combineReducers({
  data: commentsSlice.reducer,
  getMany: getManyReducer,
  createOne: createOneReducer,
  deleteOne: deleteOneReducer,
})
export { getMany, createOne, deleteOne }
