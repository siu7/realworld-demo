import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { tags } from 'api/api'

interface TagsState {
  tags?: string[]
}

const initialState: TagsState = {}
const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    listReq() {},
    listOk(state, action: PayloadAction<string[]>) {
      state.tags = action.payload
    },
    listErr(_, _e) {},
  },
})

const { listReq, listOk, listErr } = tagsSlice.actions
export default tagsSlice.reducer

const list = (): AppThunk =>
  async function (dispatch) {
    dispatch(listReq())
    try {
      let res = await tags.list()
      dispatch(listOk(res.tags))
    } catch (e) {
      dispatch(listErr(e))
    }
  }

export const tagsThunk = { list }
