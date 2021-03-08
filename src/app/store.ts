import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import articlesReducer from 'features/articles/slice'
import tagsReducer from 'features/tags/slice'
import user from 'features/user/slice'
import profile from 'features/profile/slice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    tags: tagsReducer,
    user,
    profile,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
