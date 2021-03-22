import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from 'app/store'

const userSelector = (state: RootState) => state.user.data.user

export const isAuthedSelector = createSelector(userSelector, (user) =>
  user ? true : false
)
