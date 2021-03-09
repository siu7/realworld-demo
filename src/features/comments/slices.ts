import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import type { Comment, PostCommentBody } from 'api/api'
import { comments } from 'api/api'

interface CommentsState {
  comments: Comment[]
}

let initialState: CommentsState = {
  comments: [],
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    listReq() {},
    listOk(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload
    },
    listErr(_, _e) {},

    postReq() {},
    postOk(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload)
    },
    postErr(_, _e) {},

    delReq() {},
    delOk() {},
    delErr(_, _e) {},
  },
})

export default commentsSlice.reducer

const actions = commentsSlice.actions
const list = (slug: string): AppThunk =>
  async function (dispatch) {
    const { listReq, listOk, listErr } = actions
    try {
      dispatch(listReq())
      let res = await comments.list(slug)
      dispatch(listOk(res.comments))
    } catch (e) {
      dispatch(listErr(e))
    }
  }
const post = (slug: string, comment: PostCommentBody): AppThunk =>
  async function (dispatch) {
    const { postReq, postOk, postErr } = actions
    try {
      dispatch(postReq())
      let res = await comments.post(slug, comment)
      dispatch(postOk(res.comment))
    } catch (e) {
      dispatch(postErr(e))
    }
  }
const del = (slug: string, id: number): AppThunk =>
  async function (dispatch) {
    const { delReq, delOk, delErr } = actions
    try {
      dispatch(delReq())
      await comments.del(slug, id)
      dispatch(delOk())
    } catch (e) {
      dispatch(delErr(e))
    }
  }

export const commentsThunk = {
  post,
  list,
  del,
}
