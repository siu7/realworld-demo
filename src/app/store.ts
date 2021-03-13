import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { articlesReducer } from 'features/articles/slice'
import { userReducer } from 'features/user/slice'
import { tagsReducer } from 'features/tags/slice'
import { commentsReducer } from 'features/comments/slice'
import { profileReducer } from 'features/profile/slice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
    tags: tagsReducer,
    comments: commentsReducer,
    profile: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
