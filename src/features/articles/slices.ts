import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import type {
  Article,
  MultiArticlesResponse,
  ListArticlesParams,
  FeedArticlesParams,
  PostArticleBody,
  PutArticleBody,
} from 'api/api'
import { articles } from 'api/api'

function initState(): void {
  let { pathname } = window.location
  let split = pathname.split('/')
  if (split.length > 2) {
    if (split[1] === 'article' || split[1] === 'editor')
      initialState.slug = split[2]
    if (split[1] === 'profile') initialState.listByAuthor = split[2]
    if (split[1] === 'profile' && split[3] === 'favorites')
      initialState.slug = split[2]
  }
}

interface ArticlesState {
  listArticles?: Article[]
  feedArticles?: Article[]
  limit: number
  offset: number
  listByTag?: string
  listByAuthor?: string
  listByFavorited?: string
  articlesCount?: number
  slug?: string
  article?: Article
}

let initialState: ArticlesState = {
  limit: 20,
  offset: 0,
}
initState()

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload
    },
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload
    },
    setListByTag(state, action: PayloadAction<string>) {
      action.payload === ''
        ? delete state.listByTag
        : (state.listByTag = action.payload)
    },
    setListByAuthor(state, action: PayloadAction<string>) {
      action.payload === ''
        ? delete state.listByAuthor
        : (state.listByAuthor = action.payload)
    },
    setListByFavorited(state, action: PayloadAction<string>) {
      action.payload === ''
        ? delete state.listByFavorited
        : (state.listByFavorited = action.payload)
    },
    setSlug(state, action: PayloadAction<string>) {
      action.payload === '' ? delete state.slug : (state.slug = action.payload)
    },
    //async logic
    listReq() {},
    listOk(state, action: PayloadAction<MultiArticlesResponse>) {
      state.listArticles = action.payload.articles
    },
    listErr(_, _e) {},

    getReq() {},
    getOk(state, action: PayloadAction<Article>) {
      state.article = action.payload
    },
    getErr(_, _e) {},

    postReq() {},
    postOk(state, action: PayloadAction<Article>) {
      state.article = action.payload
    },
    postErr(_, _e) {},

    putReq() {},
    putOk(state, action: PayloadAction<Article>) {
      state.article = action.payload
    },
    putErr(_, _e) {},

    delReq() {},
    delOk() {},
    delErr(_, _e) {},

    feedReq() {},
    feedOk(state, action: PayloadAction<MultiArticlesResponse>) {
      state.feedArticles = action.payload.articles
    },
    feedErr(_, _e) {},

    favReq() {},
    favOk(state, action: PayloadAction<Article>) {
      state.article = action.payload
    },
    favErr(_, _e) {},

    unfavReq() {},
    unfavOk(state, action: PayloadAction<Article>) {
      state.article = action.payload
    },
    unfavErr(_, _e) {},
  },
})

export const {
  setLimit,
  setOffset,
  setListByTag,
  setListByAuthor,
  setListByFavorited,
  setSlug,
} = articlesSlice.actions
export default articlesSlice.reducer

const { actions } = articlesSlice
const list = (params: ListArticlesParams = {}): AppThunk =>
  async function (dispatch) {
    const { listReq, listOk, listErr } = actions
    try {
      dispatch(listReq())
      let res = await articles.list(params)
      dispatch(listOk(res))
    } catch (e) {
      dispatch(listErr(e))
    }
  }

const get = (slug: string): AppThunk =>
  async function (dispatch) {
    const { getReq, getOk, getErr } = actions
    try {
      dispatch(getReq())
      let res = await articles.get(slug)
      dispatch(getOk(res.article))
    } catch (e) {
      dispatch(getErr(e))
    }
  }
const post = (body: PostArticleBody): AppThunk =>
  async function (dispatch) {
    const { postReq, postOk, postErr } = actions
    try {
      dispatch(postReq())
      let res = await articles.post(body)
      dispatch(postOk(res.article))
    } catch (e) {
      dispatch(postErr(e))
    }
  }
const put = (slug: string, body: PutArticleBody): AppThunk =>
  async function (dispatch) {
    const { putReq, putOk, putErr } = actions
    try {
      dispatch(putReq())
      let res = await articles.put(slug, body)
      dispatch(putOk(res.article))
    } catch (e) {
      dispatch(putErr(e))
    }
  }
const del = (slug: string): AppThunk =>
  async function (dispatch) {
    const { delReq, delOk, delErr } = actions
    try {
      dispatch(delReq())
      await articles.del(slug)
      dispatch(delOk())
    } catch (e) {
      dispatch(delErr(e))
    }
  }
const feed = (params: FeedArticlesParams = {}): AppThunk =>
  async function (dispatch) {
    const { feedReq, feedOk, feedErr } = actions
    try {
      dispatch(feedReq())
      let res = await articles.feed(params)
      dispatch(feedOk(res))
    } catch (e) {
      dispatch(feedErr(e))
    }
  }
const fav = (slug: string): AppThunk =>
  async function (dispatch) {
    const { favReq, favOk, favErr } = actions
    try {
      dispatch(favReq())
      let res = await articles.fav(slug)
      dispatch(favOk(res.article))
    } catch (e) {
      dispatch(favErr(e))
    }
  }
const unfav = (slug: string): AppThunk =>
  async function (dispatch) {
    const { unfavReq, unfavOk, unfavErr } = actions
    try {
      dispatch(unfavReq())
      let res = await articles.unfav(slug)
      dispatch(unfavOk(res.article))
    } catch (e) {
      dispatch(unfavErr(e))
    }
  }

export const articleThunk = {
  list,
  get,
  post,
  put,
  del,
  feed,
  fav,
  unfav,
}
