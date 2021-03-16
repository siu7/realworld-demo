import { createSlice, combineReducers } from '@reduxjs/toolkit'
import { comments } from 'api/api'
import type { Comment } from 'api/api'
import { createApiAsyncThunk, createExtraReducer } from 'app/utils'

const getMany = createApiAsyncThunk(comments.getMany, 'comments/getMany')
const getManyReducer = createExtraReducer(getMany)

const createOne = createApiAsyncThunk(comments.createOne, 'comments/createOne')
const createOneReducer = createExtraReducer(createOne)

const deleteOne = createApiAsyncThunk(comments.deleteOne, 'comments/deleteOne')
const deleteOneReducer = createExtraReducer(deleteOne)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { comments: [] } as { comments: Comment[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMany.fulfilled, (state, { payload }) => {
      state.comments = payload.comments
    })
    builder.addCase(createOne.fulfilled, (state, { payload }) => {
      state.comments.push(payload.comment)
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
