import { useForm } from 'utils/useForm'
import type { LoginBody } from 'api/api'

export default function Login() {
  const { formData, handleInputChange, handleSubmit } = useForm<
    LoginBody['user']
  >(
    {
      email: '',
      password: '',
    },
    () =>
      console.log({
        user: formData,
      })
  )

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
      <button type="submit">Login</button>
    </form>
  )
}
