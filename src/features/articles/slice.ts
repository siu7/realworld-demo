import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import type {
  Article,
  ArticleResponse,
  MultipleArticlesResponse,
  ListArticlesParams,
  FeedArticlesParams,
  CreateArticleRequestBody,
  UpdateArticleRequestBody,
  Comment,
  MultipleCommentsResponse,
} from 'api/articles'
import { articlesApi } from 'api/articles'
import { defaultErrMsg } from 'api/config'
import tokenSelector from 'features/user/tokenSelector'

interface ArticlesState {
  articles: [Article] | []
  listArticlesParams: ListArticlesParams
  limit: number
  offset: number
  article: Article | null
  comments: [Comment] | []
  slug: string
  listArticlesloading: boolean
  feedArticlesloading: boolean
  getArticleLoading: boolean
  createArticleLoading: boolean
  updateArticleLoading: boolean
  deleteArticleLoading: boolean
  getCommentsLoading: boolean
  deleteCommentLoading: boolean
  favoriteArticleLoading: boolean
  unfavoriteArticleLoading: boolean
}

const initialState: ArticlesState = {
  articles: [],
  article: null,
  comments: [],
  limit: 20,
  offset: 0,
  slug: '',
  listArticlesParams: {},
  listArticlesloading: false,
  feedArticlesloading: false,
  getArticleLoading: false,
  createArticleLoading: false,
  updateArticleLoading: false,
  deleteArticleLoading: false,
  getCommentsLoading: false,
  deleteCommentLoading: false,
  favoriteArticleLoading: false,
  unfavoriteArticleLoading: false,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setListArticlesParams(state, action: PayloadAction<ListArticlesParams>) {
      state.listArticlesParams = action.payload
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload
    },
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload
    },
    resetArticles(state) {
      state.articles = []
      state.offset = 0
    },
    setSlug(state, action: PayloadAction<string>) {
      state.slug = action.payload
    },

    //async logic
    listArticlesRequest(state) {
      state.listArticlesloading = true
    },
    listArticlesSuccess(
      state,
      action: PayloadAction<MultipleArticlesResponse>
    ) {
      state.articles = action.payload.articles
      state.listArticlesloading = false
    },
    listArticlesFailure(state, _action: PayloadAction<string>) {
      state.listArticlesloading = false
    },

    feedArticlesRequest(state) {
      state.feedArticlesloading = true
    },
    feedArticlesSuccess(
      state,
      action: PayloadAction<MultipleArticlesResponse>
    ) {
      state.articles = action.payload.articles
      state.feedArticlesloading = false
    },
    feedArticlesFailure(state, _action: PayloadAction<string>) {
      state.feedArticlesloading = false
    },

    getArticleRequest(state) {
      state.getArticleLoading = true
    },
    getArticleSuccess(state, action: PayloadAction<ArticleResponse>) {
      state.article = action.payload.article
      state.getArticleLoading = false
    },
    getArticleFailure(state, _action: PayloadAction<string>) {
      state.getArticleLoading = false
    },

    createArticleRequest(state) {
      state.createArticleLoading = true
    },
    createArticleSuccess(state, action: PayloadAction<ArticleResponse>) {
      state.article = action.payload.article
      state.createArticleLoading = false
    },
    createArticleFailure(state, _action: PayloadAction<string>) {
      state.createArticleLoading = false
    },

    updateArticleRequest(state) {
      state.updateArticleLoading = true
    },
    updateArticleSuccess(state, action: PayloadAction<ArticleResponse>) {
      state.article = action.payload.article
      state.updateArticleLoading = false
    },
    updateArticleFailure(state, _action: PayloadAction<string>) {
      state.updateArticleLoading = false
    },

    deleteArticleRequest(state) {
      state.deleteArticleLoading = true
    },
    deleteArticleSuccess(state) {
      state.deleteArticleLoading = false
    },
    deleteArticleFailure(state, _action: PayloadAction<string>) {
      state.deleteArticleLoading = false
    },

    getCommentsRequest(state) {
      state.getCommentsLoading = true
    },
    getCommentsSuccess(state, action: PayloadAction<MultipleCommentsResponse>) {
      state.comments = action.payload.comments
      state.getCommentsLoading = false
    },
    getCommentsFailure(state, _action: PayloadAction<string>) {
      state.getCommentsLoading = false
    },

    deleteCommentRequest(state) {
      state.deleteCommentLoading = true
    },
    deleteCommentSuccess(state) {
      state.deleteCommentLoading = false
    },
    deleteCommentFailure(state, _action: PayloadAction<string>) {
      state.deleteCommentLoading = false
    },

    favoriteArticleRequest(state) {
      state.favoriteArticleLoading = true
    },
    favoriteArticleSuccess(state, action: PayloadAction<ArticleResponse>) {
      state.article = action.payload.article
      state.favoriteArticleLoading = false
    },
    favoriteArticleFailure(state, _action: PayloadAction<string>) {
      state.favoriteArticleLoading = false
    },

    unfavoriteArticleRequest(state) {
      state.unfavoriteArticleLoading = true
    },
    unfavoriteArticleSuccess(state, action: PayloadAction<ArticleResponse>) {
      state.article = action.payload.article
      state.unfavoriteArticleLoading = false
    },
    unfavoriteArticleFailure(state, _action: PayloadAction<string>) {
      state.unfavoriteArticleLoading = false
    },
  },
})

export const {
  setListArticlesParams,
  setLimit,
  setOffset,
  resetArticles,
  setSlug,
} = articlesSlice.actions

const {
  listArticlesRequest,
  listArticlesSuccess,
  listArticlesFailure,
  feedArticlesRequest,
  feedArticlesSuccess,
  feedArticlesFailure,
  getArticleRequest,
  getArticleSuccess,
  getArticleFailure,
  createArticleRequest,
  createArticleSuccess,
  createArticleFailure,
  updateArticleRequest,
  updateArticleSuccess,
  updateArticleFailure,
  deleteArticleRequest,
  deleteArticleSuccess,
  deleteArticleFailure,
  getCommentsRequest,
  getCommentsSuccess,
  getCommentsFailure,
  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure,
  favoriteArticleRequest,
  favoriteArticleSuccess,
  favoriteArticleFailure,
  unfavoriteArticleRequest,
  unfavoriteArticleSuccess,
  unfavoriteArticleFailure,
} = articlesSlice.actions
export default articlesSlice.reducer

const listArticles = (params: ListArticlesParams = {}): AppThunk =>
  async function (dispatch) {
    dispatch(listArticlesRequest())
    try {
      let res = await articlesApi.listArticles(params)
      dispatch(listArticlesSuccess(res))
    } catch (e) {
      dispatch(listArticlesFailure(defaultErrMsg(e)))
    }
  }

const feedArticles = (params: FeedArticlesParams = {}): AppThunk =>
  async function (dispatch, getState) {
    dispatch(feedArticlesRequest())
    try {
      let token = tokenSelector(getState())
      let res = await articlesApi.feedArticles(params, token)
      dispatch(feedArticlesSuccess(res))
    } catch (e) {
      dispatch(feedArticlesFailure(defaultErrMsg(e)))
    }
  }

const getArticle = (slug: string): AppThunk =>
  async function (dispatch) {
    dispatch(getArticleRequest())
    try {
      let res = await articlesApi.getArticle(slug)
      dispatch(getArticleSuccess(res))
    } catch (e) {
      dispatch(getArticleFailure(defaultErrMsg(e)))
    }
  }

const createArticle = (article: CreateArticleRequestBody): AppThunk =>
  async function (dispatch, getState) {
    dispatch(createArticleRequest())
    try {
      let token = tokenSelector(getState())
      let res = await articlesApi.createArticle(article, token)
      dispatch(createArticleSuccess(res))
    } catch (e) {
      dispatch(createArticleFailure(defaultErrMsg(e)))
    }
  }

const updateArticle = (
  slug: string,
  article: UpdateArticleRequestBody
): AppThunk =>
  async function (dispatch, getState) {
    dispatch(updateArticleRequest())
    try {
      let token = tokenSelector(getState())
      let res = await articlesApi.updateArticle(slug, article, token)
      dispatch(updateArticleSuccess(res))
    } catch (e) {
      dispatch(updateArticleFailure(defaultErrMsg(e)))
    }
  }

const deleteArticle = (slug: string): AppThunk =>
  async function (dispatch, getState) {
    dispatch(deleteArticleRequest())
    try {
      let token = tokenSelector(getState())
      await articlesApi.deleteArticle(slug, token)
      dispatch(deleteArticleSuccess())
    } catch (e) {
      dispatch(deleteArticleFailure(defaultErrMsg(e)))
    }
  }

const getComments = (slug: string): AppThunk =>
  async function (dispatch, getState) {
    dispatch(getCommentsRequest())
    try {
      let token = tokenSelector(getState())
      let res = await articlesApi.getComments(slug, token)
      dispatch(getCommentsSuccess(res))
    } catch (e) {
      dispatch(getCommentsFailure(defaultErrMsg(e)))
    }
  }

const deleteComment = (slug: string, id: number): AppThunk =>
  async function (dispatch, getState) {
    dispatch(deleteCommentRequest())
    try {
      let token = tokenSelector(getState())
      await articlesApi.deleteComment(slug, id, token)
      dispatch(deleteCommentSuccess())
    } catch (e) {
      dispatch(deleteCommentFailure(defaultErrMsg(e)))
    }
  }

const favoriteArticle = (slug: string): AppThunk =>
  async function (dispatch, getState) {
    dispatch(favoriteArticleRequest())
    try {
      let token = tokenSelector(getState())
      let res = await articlesApi.favoriteArticle(slug, token)
      dispatch(favoriteArticleSuccess(res))
    } catch (e) {
      dispatch(favoriteArticleFailure(defaultErrMsg(e)))
    }
  }

const unfavoriteArticle = (slug: string): AppThunk =>
  async function (dispatch, getState) {
    dispatch(unfavoriteArticleRequest())
    try {
      let token = tokenSelector(getState())
      let res = await articlesApi.unfavoriteArticle(slug, token)
      dispatch(unfavoriteArticleSuccess(res))
    } catch (e) {
      dispatch(unfavoriteArticleFailure(defaultErrMsg(e)))
    }
  }

export {
  listArticles,
  feedArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getComments,
  deleteComment,
  favoriteArticle,
  unfavoriteArticle,
}
