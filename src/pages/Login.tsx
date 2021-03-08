import { useState, useEffect } from 'react'
import { useLogin } from 'features/user/useUser'
import { useForm } from 'app/useForm'
import type { LoginRequestBody } from 'api/users'

export default function Login() {
  const [didLoad, setDidLoad] = useState(false)
  const { loginLoading, login, error, resetError } = useLogin()
  useEffect(() => {
    if (!didLoad) {
      resetError()
      setDidLoad(true)
    }
  }, [didLoad, resetError])

  const { formData, handleInputChange, handleSubmit } = useForm<
    LoginRequestBody['user']
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
      {loginLoading && <label>Loading</label>}
      {error && <label>{error}</label>}
    </form>
  )
}
