import { createSlice, combineReducers } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { articles } from 'api/api'
import type { Article, GetArticlesFilters } from 'api/api'
import { createApiAsyncThunk, createExtraReducer } from 'app/utils'

const getMany = createApiAsyncThunk(articles.getMany, 'articles/getMany')
const getManyReducer = createExtraReducer(getMany)

const getOne = createApiAsyncThunk(articles.getOne, 'articles/getOne')
const getOneReducer = createExtraReducer(getOne)

const createOne = createApiAsyncThunk(articles.createOne, 'articles/createOne')
const createOneReducer = createExtraReducer(createOne)

const updateOne = createApiAsyncThunk(articles.updateOne, 'articles/updateOne')
const updateOneReducer = createExtraReducer(updateOne)

const deleteOne = createApiAsyncThunk(articles.deleteOne, 'articles/deleteOne')
const deleteOneReducer = createExtraReducer(deleteOne)

const getFeeds = createApiAsyncThunk(articles.getFeeds, 'articles/getFeeds')
const getFeedsReducer = createExtraReducer(getFeeds)

const favoriteOne = createApiAsyncThunk(
  articles.favoriteOne,
  'articles/favoriteOne'
)
const favoriteOneReducer = createExtraReducer(favoriteOne)

const unfavoriteOne = createApiAsyncThunk(
  articles.unfavoriteOne,
  'articles/unfavoriteOne'
)
const unfavoriteOneReducer = createExtraReducer(unfavoriteOne)

interface InitialState {
  articles: Article[]
  articlesCount?: number
  getArticlesFilter: GetArticlesFilters
  article?: Article
  slug: string | null
  feeds: Article[]
  feedsCount?: number
  offset: number
  limit: number
}
const initialState: InitialState = {
  articles: [],
  getArticlesFilter: {},
  slug: null,
  feeds: [],
  offset: 0,
  limit: 10,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setTag(state, { payload }: PayloadAction<string>) {
      state.getArticlesFilter.tag = payload
    },
    setAuthor(state, { payload }: PayloadAction<string>) {
      state.getArticlesFilter.author = payload
    },
    setFavorited(state, { payload }: PayloadAction<string>) {
      state.getArticlesFilter.favorited = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMany.fulfilled, (state, { payload }) => {
      state.articles = payload.articles
      state.articlesCount = { payload }.payload.articlesCount
    })
    builder.addCase(getOne.fulfilled, (state, { payload }) => {
      state.article = payload.article
    })
    builder.addCase(createOne.fulfilled, (state, { payload }) => {
      state.article = payload.article
    })
    builder.addCase(updateOne.fulfilled, (state, { payload }) => {
      state.article = payload.article
    })
    builder.addCase(getFeeds.fulfilled, (state, { payload }) => {
      state.feeds = payload.articles
      state.feedsCount = payload.articlesCount
    })
    builder.addCase(favoriteOne.fulfilled, (state, { payload }) => {
      state.article = payload.article
    })
    builder.addCase(unfavoriteOne.fulfilled, (state, { payload }) => {
      state.article = payload.article
    })
  },
})
export const articlesReducer = combineReducers({
  data: articlesSlice.reducer,
  getMany: getManyReducer,
  getOne: getOneReducer,
  createOne: createOneReducer,
  updateOne: updateOneReducer,
  deleteOne: deleteOneReducer,
  getFeeds: getFeedsReducer,
  favoriteOne: favoriteOneReducer,
  unfavoriteOne: unfavoriteOneReducer,
})
export {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getFeeds,
  favoriteOne,
  unfavoriteOne,
}
export const { setTag, setAuthor, setFavorited } = articlesSlice.actions
