import { RootState } from 'app/store'

export default function tokenSelector(state: RootState): string {
  let user = state.user.user
  if (user !== null) {
    return user.token
  } else return ''
}
