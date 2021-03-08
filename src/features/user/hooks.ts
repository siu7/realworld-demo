import { useAppDispatch, useAppSelector } from 'app/hooks'
import { login, signup, updateUser } from 'features/user/slice'
import { resetError } from 'features/user/slice'
import type {
  LoginRequestBody,
  SignupRequestBody,
  UpdateUserRequestBody,
} from 'api/users'

function useLogin() {
  const dispatch = useAppDispatch()
  const { loginLoading, error } = useAppSelector((state) => state.user)

  return {
    loginLoading,
    error,
    resetError: () => dispatch(resetError()),
    login: (user: LoginRequestBody) => dispatch(login(user)),
  }
}

function useSignup() {
  const dispatch = useAppDispatch()
  const { signupLoading, error } = useAppSelector((state) => state.user)

  return {
    signupLoading,
    error,
    resetError: () => dispatch(resetError()),
    signup: (user: SignupRequestBody) => dispatch(signup(user)),
  }
}

function useGetCurrentUser() {
  const { user } = useAppSelector((state) => state.user)
  return {
    user,
  }
}

function useUpdateUser() {
  const dispatch = useAppDispatch()
  const { updateUserLoading } = useAppSelector((state) => state.user)
  return {
    updateUserLoading,
    updateUser: (user: UpdateUserRequestBody) => dispatch(updateUser(user)),
  }
}

export { useLogin, useSignup, useGetCurrentUser, useUpdateUser }
