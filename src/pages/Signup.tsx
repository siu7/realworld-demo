import { useForm } from 'utils/useForm'
import type { SignupBody } from 'api/api'

export default function Signup() {
  const { formData, handleInputChange, handleSubmit } = useForm<
    SignupBody['user']
  >(
    {
      username: '',
      email: '',
      password: '',
    },
    () =>
      console.log({
        user: formData,
      })
  )
  const { username, email, password } = formData
  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Signup</button>
    </form>
  )
}
