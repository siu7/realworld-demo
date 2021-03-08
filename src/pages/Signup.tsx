import { useState, useEffect } from 'react'
import { useSignup } from 'features/user/hooks'
import { useForm } from 'utils/useForm'
import type { SignupRequestBody } from 'api/users'

export default function Signup() {
  const [didLoad, setDidLoad] = useState(false)
  const { signupLoading, signup, error, resetError } = useSignup()
  useEffect(() => {
    if (!didLoad) {
      resetError()
      setDidLoad(true)
    }
  }, [didLoad, resetError])

  const { formData, handleInputChange, handleSubmit } = useForm<
    SignupRequestBody['user']
  >(
    {
      username: '',
      email: '',
      password: '',
    },
    () =>
      signup({
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
      {signupLoading && <label>Loading</label>}
      {error && <label>{error}</label>}
    </form>
  )
}
