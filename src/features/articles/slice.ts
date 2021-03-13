import { createSlice, combineReducers } from '@reduxjs/toolkit'
import { articles } from 'api/api'
import type { Article, GetArticlesFilters } from 'api/api'
import { createAsyncThunkReducer } from 'app/utils'
import type { AsyncReturnType } from 'app/utils'

const {
  asyncThunk: getMany,
  reducer: getManyReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof articles.getMany>,
  Parameters<typeof articles.getMany>[0]
>('articles/getMany', articles.getMany)

const { asyncThunk: getOne, reducer: getOneReducer } = createAsyncThunkReducer<
  AsyncReturnType<typeof articles.getOne>,
  Parameters<typeof articles.getOne>[0]
>('articles/getOne', articles.getOne)

const {
  asyncThunk: createOne,
  reducer: createOneReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof articles.createOne>,
  Parameters<typeof articles.createOne>[0]
>('articles/createOne', articles.createOne)

const {
  asyncThunk: updateOne,
  reducer: updateOneReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof articles.updateOne>,
  Parameters<typeof articles.updateOne>[0]
>('articles/updateOne', articles.updateOne)

const {
  asyncThunk: deleteOne,
  reducer: deleteOneReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof articles.deleteOne>,
  Parameters<typeof articles.deleteOne>[0]
>('articles/deleteOne', articles.deleteOne)

const {
  asyncThunk: getFeeds,
  reducer: getFeedsReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof articles.getFeeds>,
  Parameters<typeof articles.getFeeds>[0]
>('articles/getFeeds', articles.getFeeds)

const {
  asyncThunk: favoriteOne,
  reducer: favoriteOneReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof articles.favoriteOne>,
  Parameters<typeof articles.favoriteOne>[0]
>('articles/favoriteOne', articles.favoriteOne)

const {
  asyncThunk: unfavoriteOne,
  reducer: unfavoriteOneReducer,
} = createAsyncThunkReducer<
  AsyncReturnType<typeof articles.unfavoriteOne>,
  Parameters<typeof articles.unfavoriteOne>[0]
>('articles/unfavoriteOne', articles.unfavoriteOne)

interface InitialState {
  articles: Article[]
  articlesCount?: number
  getArticlesFilter: GetArticlesFilters
  article?: Article
  slug: string | null
  feeds: Article[]
  feedsCount?: number
  offset: 0
  limit: 20
}
const initialState: InitialState = {
  articles: [],
  getArticlesFilter: {},
  slug: null,
  feeds: [],
  offset: 0,
  limit: 20,
}
const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMany.fulfilled, (state, action) => {
      state.articles = action.payload.articles
      state.articlesCount = action.payload.articlesCount
    })
    builder.addCase(getOne.fulfilled, (state, action) => {
      state.article = action.payload.article
    })
    builder.addCase(createOne.fulfilled, (state, action) => {
      state.article = action.payload.article
    })
    builder.addCase(updateOne.fulfilled, (state, action) => {
      state.article = action.payload.article
    })
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.feeds = action.payload.articles
      state.feedsCount = action.payload.articlesCount
    })
    builder.addCase(favoriteOne.fulfilled, (state, action) => {
      state.article = action.payload.article
    })
    builder.addCase(unfavoriteOne.fulfilled, (state, action) => {
      state.article = action.payload.article
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
