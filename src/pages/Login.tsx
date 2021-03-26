import { Link } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { LoginBody } from 'api/api'
import { useForm } from 'utils/useForm'
import { login } from 'features/user/slice'
import { ErrorsList } from 'components/ErrorsList'
import styles from './Login.module.css'

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
    <form onSubmit={handleSubmit} className={`${styles.form} container`}>
      <h1>Login</h1>
      <Link href="/signup">Need an account? </Link>
      {errors && <ErrorsList errors={errors} />}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleInputChange}
        required
        disabled={loading}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleInputChange}
        required
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className={`primary-btn ${styles.submitButton}`}
      >
        Login
      </button>
    </form>
  )
}
