import { RootState } from 'app/store'

const tokenSelector = (state: RootState): string | null =>
  state.user.user ? state.user.user.token : null

export { tokenSelector }
