import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { RootState } from 'app/store'
import { login, signup, updateOne, getCurrent } from 'features/user/slice'
const userSelector = (state: RootState) => state.user.data

export function useLogin() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.user.login)
  return {
    login: (params: Parameters<typeof login>[0]) => dispatch(login(params)),
    loading,
    errors,
  }
}
export function useSignup() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.user.signup)
  return {
    signup: (params: Parameters<typeof signup>[0]) => dispatch(signup(params)),
    loading,
    errors,
  }
}
export function useUpdateOne() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.user.updateOne)
  return {
    updateOne: (params: Parameters<typeof updateOne>[0]) =>
      dispatch(updateOne(params)),
    loading,
    errors,
  }
}
export function useGetCurrentUser() {
  const [didLoad, setDidLoad] = useState(false)
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.user.getCurrent)
  const { user } = useAppSelector(userSelector)
  useEffect(() => {
    if (!didLoad) {
      let token = localStorage.getItem('jwtToken')
      if (token) dispatch(getCurrent())
      setDidLoad(true)
    }
  }, [dispatch, didLoad, setDidLoad])
  return {
    user,
    //getCurrent: () => dispatch(getCurrent()),
    loading,
    errors,
  }
}
