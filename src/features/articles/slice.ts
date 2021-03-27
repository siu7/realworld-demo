import { createSlice, combineReducers } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { articles } from 'api/api'
import type { Article, GetArticlesFilters } from 'api/api'
import { createApiAsyncThunk, createExtraReducer } from 'app/utils'
import { articleTabs } from './articleTabs'

const getMany = createApiAsyncThunk(articles.getMany, 'articles/getMany')
const getManyReducer = createExtraReducer(getMany)

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

type TabType = 'global' | 'feed' | 'tag' | 'favorited' | 'author'
export interface ArticleTab {
  name: string
  type: TabType
  active: boolean
  visible: boolean
}

interface InitialState {
  articles: Article[]
  articlesCount?: number
  offset: number
  limit: number
  getArticlesFilter: GetArticlesFilters
  article?: Article
  feedsCount?: number
  articleTabs: ArticleTab[]
}
const initialState: InitialState = {
  articles: [],
  getArticlesFilter: {},
  offset: 0,
  limit: 10,
  articleTabs,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    unsetArticle(state) {
      state.articles = []
      delete state.articlesCount
      state.offset = 0
    },
    setTab(
      state,
      { payload }: PayloadAction<{ index: number; tab: ArticleTab }>
    ) {
      state.articleTabs[payload.index] = payload.tab
    },
    setTabActive(
      state,
      { payload }: PayloadAction<[index: number, active: boolean]>
    ) {
      state.articleTabs[payload[0]].active = payload[1]
      state.articles = []
      delete state.articlesCount
      state.offset = 0
    },
    setTabVisible(
      state,
      { payload }: PayloadAction<[index: number, visible: boolean]>
    ) {
      state.articleTabs[payload[0]].visible = payload[1]
    },
    setTagTabName(state, { payload }: PayloadAction<string>) {
      state.articleTabs[2].name = payload
    },
    unsetTabs(state) {
      for (let tab of state.articleTabs) {
        tab.visible = false
        tab.active = false
      }
    },
    unsetTabsActive(state) {
      for (let tab of state.articleTabs) {
        tab.active = false
      }
    },
    unsetTabsVisible(state) {
      for (let tab of state.articleTabs) {
        tab.visible = false
      }
    },
    setHomeTabs(state) {
      state.articleTabs[1].active = true
      state.articleTabs[1].visible = true
    },
    setAuthedHomeTabs(state) {
      state.articleTabs[0].active = true
      state.articleTabs[0].visible = true
      state.articleTabs[1].visible = true
    },
    setProfileTabs(state) {
      state.articleTabs[3].active = true
      state.articleTabs[3].visible = true
      state.articleTabs[4].visible = true
    },
    setFavoritesTabs(state) {
      state.articleTabs[4].active = true
      state.articleTabs[3].visible = true
      state.articleTabs[4].visible = true
    },
    setTagTab(state, { payload }: PayloadAction<string>) {
      state.articleTabs[2].active = true
      state.articleTabs[2].visible = true
      state.articleTabs[2].name = payload
    },
    setOffset(state, { payload }: PayloadAction<number>) {
      state.offset = payload
    },
    setTag(state, { payload }: PayloadAction<string>) {
      state.getArticlesFilter.tag = payload
      state.articles = []
      delete state.articlesCount
      state.offset = 0
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
      state.articlesCount = payload.articlesCount
    })
    builder.addCase(getArticlesFeeds.fulfilled, (state, { payload }) => {
      state.articles = payload.articles
      state.articlesCount = payload.articlesCount
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
      let index = state.articles.findIndex(
        (article) => article.slug === payload.article.slug
      )
      if (index !== -1) {
        state.articles[index] = payload.article
      }
      if (state.article?.slug === payload.article.slug)
        state.article = payload.article
    })
    builder.addCase(unfavoriteOne.fulfilled, (state, { payload }) => {
      let index = state.articles.findIndex(
        (article) => article.slug === payload.article.slug
      )
      if (index !== -1) {
        state.articles[index] = payload.article
      }
      if (state.article?.slug === payload.article.slug)
        state.article = payload.article
    })
  },
})
export const articlesReducer = combineReducers({
  data: articlesSlice.reducer,
  getMany: getManyReducer,
  getArticlesFeeds: getArticlesFeedsReducer,

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
  getOne,
  createOne,
  updateOne,
  deleteOne,
  favoriteOne,
  unfavoriteOne,
}
export const {
  unsetArticle,
  setTagTabName,
  unsetTabsVisible,
  unsetTabsActive,
  unsetTabs,
  setTab,
  setTabActive,
  setTabVisible,
  setTag,
  setAuthor,
  setFavorited,
  setOffset,
  setHomeTabs,
  setAuthedHomeTabs,
  setProfileTabs,
  setFavoritesTabs,
  setTagTab,
} = articlesSlice.actions
