import { RootState } from 'app/store'

function tokenSelector(state: RootState): string {
  let user = state.user.user
  if (user !== null) {
    return user.token
  } else return ''
}

const isAuthSelector = (state: RootState) => state.user.isAuth
export { tokenSelector, isAuthSelector }
