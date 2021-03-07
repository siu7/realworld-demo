import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import articles from 'features/articles/slice'
import tags from 'features/tags/slice'
import user from 'features/user/slice'
import profile from 'features/profile/slice'

export const store = configureStore({
  reducer: {
    articles,
    tags,
    user,
    profile,
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
