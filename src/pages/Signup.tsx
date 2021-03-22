import { Link } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { SignupBody } from 'api/api'
import { useForm } from 'utils/useForm'
import { signup } from 'features/user/slice'
import { ErrorsList } from 'components/ErrorsList'
import styles from './Login.module.css'

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
    <form onSubmit={handleSubmit} className={`${styles.form} container`}>
      <h1>Signup</h1>
      <Link href="/login">Have an account? </Link>
      {errors && <ErrorsList errors={errors} />}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={handleInputChange}
        required
        disabled={loading}
      />
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
      <button type="submit" disabled={loading} className={styles.submitButton}>
        Signup
      </button>
    </form>
  )
}
