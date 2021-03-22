import { createSlice, combineReducers } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { articles } from 'api/api'
import type { Article, GetArticlesFilters } from 'api/api'
import { createApiAsyncThunk, createExtraReducer } from 'app/utils'
import { articleTabs } from './articleTabs'

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

type TabType = 'global' | 'feed' | 'tag' | 'favorited' | 'author'
export interface ArticleTab {
  name: string
  type: TabType
  active: boolean
  visible: boolean
  previousActive?: boolean
}
export interface ArticlesSet {
  articles: Article[]
  offset: number
  articlesCount?: number
}

interface InitialState {
  articles: ArticlesSet
  articlesByFavorited: ArticlesSet
  articlesByTag: ArticlesSet
  articlesByAuthor: ArticlesSet
  articlesFeeds: ArticlesSet

  getArticlesFilter: GetArticlesFilters
  article?: Article
  feedsCount?: number
  offset: number
  limit: number
  selectedTabType: TabType
  homeSelectedTabType: TabType
  articleTabs: ArticleTab[]
}
const initialState: InitialState = {
  articles: { articles: [], offset: 0 },
  articlesByFavorited: { articles: [], offset: 0 },
  articlesByTag: { articles: [], offset: 0 },
  articlesByAuthor: { articles: [], offset: 0 },
  articlesFeeds: { articles: [], offset: 0 },

  getArticlesFilter: {},
  offset: 0,
  limit: 10,
  selectedTabType: 'global',
  homeSelectedTabType: 'global',
  articleTabs,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
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
    setPreviousActiveTab(state) {
      let activeTabIndex = state.articleTabs.findIndex((tab) => tab.active)
      for (let tab of state.articleTabs) {
        tab.previousActive = false
      }
      state.articleTabs[activeTabIndex].previousActive = true
    },
    unsetPreviousActiveTab(state) {
      for (let tab of state.articleTabs) {
        tab.previousActive = false
      }
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
    setOffset(state, { payload }: PayloadAction<number>) {
      let activeTab = state.articleTabs.find((tab) => tab.active)
      if (activeTab?.type === 'global') {
        state.articles.offset = payload
      }
      if (activeTab?.type === 'feed') {
        state.articlesFeeds.offset = payload
      }
      if (activeTab?.type === 'tag') {
        state.articlesByTag.offset = payload
      }
      if (activeTab?.type === 'favorited') {
        state.articlesByFavorited.offset = payload
      }
      if (activeTab?.type === 'author') {
        state.articlesByAuthor.offset = payload
      }
    },
    clearArticles(state) {
      let activeTab = state.articleTabs.find((tab) => tab.active)
      if (activeTab?.type === 'global') {
        state.articles.articles = []
      }
      if (activeTab?.type === 'feed') {
        state.articlesFeeds.articles = []
      }
      if (activeTab?.type === 'tag') {
        state.articlesByTag.articles = []
      }
      if (activeTab?.type === 'favorited') {
        state.articlesByFavorited.articles = []
      }
      if (activeTab?.type === 'author') {
        state.articlesByAuthor.articles = []
      }
    },
    setHomeSelectedTabType(state, { payload }: PayloadAction<TabType>) {
      state.homeSelectedTabType = payload
    },
    setTag(state, { payload }: PayloadAction<string>) {
      state.getArticlesFilter.tag = payload
    },
    setAuthor(state, { payload }: PayloadAction<string>) {
      state.getArticlesFilter.author = payload
    },
    setFavorited(state, { payload }: PayloadAction<string>) {
      state.getArticlesFilter.favorited = payload
    },
    setSelectedTabType(state, { payload }: PayloadAction<TabType>) {
      state.selectedTabType = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMany.fulfilled, (state, { payload }) => {
      state.articles.articles = payload.articles
      state.articles.articlesCount = { payload }.payload.articlesCount
    })
    builder.addCase(getArticlesByFavorited.fulfilled, (state, { payload }) => {
      state.articlesByFavorited.articles = payload.articles
      state.articlesByFavorited.articlesCount = payload.articlesCount
    })
    builder.addCase(getArticlesByTag.fulfilled, (state, { payload }) => {
      state.articlesByTag.articles = payload.articles
      state.articlesByTag.articlesCount = payload.articlesCount
    })
    builder.addCase(getArticlesByAuthor.fulfilled, (state, { payload }) => {
      state.articlesByAuthor.articles = payload.articles
      state.articlesByAuthor.articlesCount = payload.articlesCount
    })
    builder.addCase(getArticlesFeeds.fulfilled, (state, { payload }) => {
      state.articlesFeeds.articles = payload.articles
      state.articlesFeeds.articlesCount = payload.articlesCount
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
      let activeTab = state.articleTabs.find((tab) => tab.active)
      let slug = payload.article.slug
      let articles
      let index = -1
      if (activeTab?.type === 'global') {
        articles = state.articles.articles.findIndex(
          (article) => article.slug === slug
        )
      }
      if (activeTab?.type === 'feed') {
        articles = state.articlesFeeds.articles.findIndex(
          (article) => article.slug === slug
        )
      }
      if (activeTab?.type === 'tag') {
        articles = state.articlesByTag.articles.findIndex(
          (article) => article.slug === slug
        )
      }
      if (activeTab?.type === 'favorited') {
        articles = state.articlesByFavorited.articles.findIndex(
          (article) => article.slug === slug
        )
      }
      if (activeTab?.type === 'author') {
        articles = state.articlesByAuthor.articles.findIndex(
          (article) => article.slug === slug
        )
      }
      if (index !== -1) state.article = payload.article
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
export const {
  unsetPreviousActiveTab,
  setPreviousActiveTab,
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
  setSelectedTabType,
  setOffset,
  clearArticles,
  setHomeSelectedTabType,
} = articlesSlice.actions
