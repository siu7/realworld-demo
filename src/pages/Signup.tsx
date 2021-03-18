import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { SignupBody } from 'api/api'
import { useForm } from 'utils/useForm'
import { signup } from 'features/user/slice'
import { ErrorsList } from 'components/ErrorsList'

export default function Signup() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.user.signup)
  const { formData, handleInputChange, handleSubmit } = useForm<
    SignupBody['user']
  >(
    {
      username: '',
      email: '',
      password: '',
    },
    () =>
      dispatch(
        signup({
          user: formData,
        })
      )
  )

  const { username, email, password } = formData
  return (
    <form onSubmit={handleSubmit}>
      {errors && <ErrorsList errors={errors} />}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={handleInputChange}
      />
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
        Signup
      </button>
    </form>
  )
}
