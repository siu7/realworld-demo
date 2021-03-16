import type { LoginBody } from 'api/api'
import { useForm } from 'utils/useForm'
import { useLogin } from 'features/user/hooks'

export default function Login() {
  const { formData, handleInputChange, handleSubmit } = useForm<
    LoginBody['user']
  >(
    {
      email: '',
      password: '',
    },
    () =>
      login({
        user: formData,
      })
  )
  const { login, loading } = useLogin()

  const { email, password } = formData
  return (
    <form onSubmit={handleSubmit}>
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
