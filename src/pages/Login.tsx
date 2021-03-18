import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { LoginBody } from 'api/api'
import { useForm } from 'utils/useForm'
import { login } from 'features/user/slice'
import { ErrorsList } from 'components/ErrorsList'

export default function Login() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.user.login)
  const { formData, handleInputChange, handleSubmit } = useForm<
    LoginBody['user']
  >(
    {
      email: '',
      password: '',
    },
    () =>
      dispatch(
        login({
          user: formData,
        })
      )
  )

  const { email, password } = formData
  return (
    <form onSubmit={handleSubmit}>
      {errors && <ErrorsList errors={errors} />}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleInputChange}
      />
      <button type="submit" disabled={loading}>
        Login
      </button>
    </form>
  )
}
