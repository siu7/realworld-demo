import { createSlice, combineReducers } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { articles } from 'api/api'
import type { Article, GetArticlesFilters } from 'api/api'
import { createApiAsyncThunk, createExtraReducer } from 'app/utils'

const getMany = createApiAsyncThunk(articles.getMany, 'articles/getMany')
const getManyReducer = createExtraReducer(getMany)

const getArticlesByFavorited = createApiAsyncThunk(
  articles.getMany,
  'articles/getArticlesByFavorited'
)
const getArticlesByFavoritedReducer = createExtraReducer(getArticlesByFavorited)

const getArticlesByTag = createApiAsyncThunk(
  articles.getMany,
  'articles/getArticlesByTag'
)
const getArticlesByTagReducer = createExtraReducer(getArticlesByTag)

const getArticlesByAuthor = createApiAsyncThunk(
  articles.getMany,
  'articles/getArticlesByAuthor'
)
const getArticlesByAuthorReducer = createExtraReducer(getArticlesByAuthor)
const getArticlesFeeds = createApiAsyncThunk(
  articles.getFeeds,
  'articles/getArticlesFeeds'
)
const getArticlesFeedsReducer = createExtraReducer(getArticlesFeeds)

const getOne = createApiAsyncThunk(articles.getOne, 'articles/getOne')
const getOneReducer = createExtraReducer(getOne)

const createOne = createApiAsyncThunk(articles.createOne, 'articles/createOne')
const createOneReducer = createExtraReducer(createOne)

const updateOne = createApiAsyncThunk(articles.updateOne, 'articles/updateOne')
const updateOneReducer = createExtraReducer(updateOne)

const deleteOne = createApiAsyncThunk(articles.deleteOne, 'articles/deleteOne')
const deleteOneReducer = createExtraReducer(deleteOne)

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
  articlesByFavorited: Article[]
  articlesByFavoritedCount?: number
  articlesByTag: Article[]
  articlesByTagCount?: number
  articlesByAuthor: Article[]
  articlesByAuthorCount?: number
  articlesFeeds: Article[]
  articlesFeedsCount?: number

  getArticlesFilter: GetArticlesFilters
  article?: Article
  feedsCount?: number
  offset: number
  limit: number
}
const initialState: InitialState = {
  articles: [],
  articlesByFavorited: [],
  articlesByTag: [],
  articlesByAuthor: [],
  articlesFeeds: [],

  getArticlesFilter: {},
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
    builder.addCase(getArticlesByFavorited.fulfilled, (state, { payload }) => {
      state.articlesByFavorited = payload.articles
      state.articlesByFavoritedCount = payload.articlesCount
    })
    builder.addCase(getArticlesByTag.fulfilled, (state, { payload }) => {
      state.articlesByTag = payload.articles
      state.articlesByTagCount = payload.articlesCount
    })
    builder.addCase(getArticlesByAuthor.fulfilled, (state, { payload }) => {
      state.articlesByAuthor = payload.articles
      state.articlesByAuthorCount = payload.articlesCount
    })
    builder.addCase(getArticlesFeeds.fulfilled, (state, { payload }) => {
      state.articlesFeeds = payload.articles
      state.articlesFeedsCount = payload.articlesCount
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
  getArticlesFeeds: getArticlesFeedsReducer,
  getArticlesByFavorited: getArticlesByFavoritedReducer,
  getArticlesByTag: getArticlesByTagReducer,
  getArticlesByAuthor: getArticlesByAuthorReducer,

  getOne: getOneReducer,
  createOne: createOneReducer,
  updateOne: updateOneReducer,
  deleteOne: deleteOneReducer,
  favoriteOne: favoriteOneReducer,
  unfavoriteOne: unfavoriteOneReducer,
})
export {
  getMany,
  getArticlesFeeds,
  getArticlesByFavorited,
  getArticlesByTag,
  getArticlesByAuthor,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  favoriteOne,
  unfavoriteOne,
}
export const { setTag, setAuthor, setFavorited } = articlesSlice.actions
