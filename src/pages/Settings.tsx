import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { UpdateUserBody } from 'api/api'
import { useForm } from 'utils/useForm'
import { updateOne, logout } from 'features/user/slice'
import { ErrorsList } from 'components/ErrorsList'
import styles from './Login.module.css'
import stylesEditor from './Settings.module.css'

export default function Settings() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector((state) => state.user.updateOne)
  const { user } = useAppSelector((state) => state.user.data)
  const {
    formData,
    handleInputChange,
    handleSubmit,
    handleTextAreaChange,
  } = useForm<UpdateUserBody['user']>(
    {
      username: user?.username,
      email: user?.email,
      password: '',
      bio: user?.bio || '',
      image: user?.image || '',
    },
    () => handleUpdate()
  )

  function handleUpdate() {
    let tmp = JSON.parse(JSON.stringify(formData))
    for (let key in tmp) {
      if (tmp[key] === '') delete tmp[key]
    }
    dispatch(
      updateOne({
        user: tmp,
      })
    )
  }
  const { username, email, password, bio, image } = formData
  return (
    <>
      <form onSubmit={handleSubmit} className={`${styles.form} container`}>
        <h1>Your Settings</h1>
        {errors && <ErrorsList errors={errors} />}
        <input
          type="text"
          name="image"
          placeholder="URL of profile picture"
          value={image}
          onChange={handleInputChange}
          disabled={loading}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleInputChange}
          disabled={loading}
        />
        <textarea
          name="bio"
          placeholder="Short bio about you"
          value={bio}
          onChange={handleTextAreaChange}
          rows={4}
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
          placeholder="New Password"
          value={password}
          onChange={handleInputChange}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          Update Settings
        </button>
      </form>
      <div className={`${styles.form} container`}>
        <hr className={stylesEditor.divider} />
        <button
          onClick={() => dispatch(logout())}
          className={stylesEditor.logoutButton}
        >
          Or click here to logout.
        </button>
      </div>
    </>
  )
}
