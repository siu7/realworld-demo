import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import tags from 'features/tags/slice'

export const store = configureStore({
  reducer: {
    tags,
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
