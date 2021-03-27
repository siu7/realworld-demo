import { createSlice, combineReducers } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
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
  reducers: {
    deleteComment(state, { payload }: PayloadAction<number>) {
      let targetIndex = state.comments.findIndex(
        (comment) => comment.id === payload
      )
      if (targetIndex !== -1) state.comments.splice(targetIndex, 1)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMany.fulfilled, (state, { payload }) => {
      state.comments = payload.comments
    })
    builder.addCase(createOne.fulfilled, (state, { payload }) => {
      state.comments.unshift(payload.comment)
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
export const { deleteComment } = commentsSlice.actions
