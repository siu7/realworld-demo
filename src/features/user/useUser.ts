import { useAppDispatch, useAppSelector } from 'app/hooks'
import { login, signup, updateUser } from 'features/user/slice'
import type {
  LoginRequestBody,
  SignupRequestBody,
  UpdateUserRequestBody,
} from 'api/users'

function useLogin() {
  const dispatch = useAppDispatch()
  const { loginLoading } = useAppSelector((state) => state.user)

  return {
    loginLoading,
    login: (user: LoginRequestBody) => dispatch(login(user)),
  }
}

function useSignup() {
  const dispatch = useAppDispatch()
  const { signupLoading } = useAppSelector((state) => state.user)

  return {
    signupLoading,
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
