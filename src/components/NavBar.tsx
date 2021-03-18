import { Link } from 'wouter'
import { useAppSelector } from 'app/hooks'
import styles from './NavBar.module.css'

export default function NavBar() {
  const { user } = useAppSelector((state) => state.user.data)
  const { loading } = useAppSelector((state) => state.user.getCurrent)
  let linkItem = [{ to: '/', text: 'Home' }]
  if (user.username) {
    linkItem.push(
      { to: '/settings', text: 'Settings' },
      { to: '/editor', text: 'New Article' },
      { to: `/profile/${user.username}`, text: user.username }
    )
  } else {
    linkItem.push(
      { to: '/login', text: 'Login' },
      { to: '/signup', text: 'Signup' }
    )
  }

  return (
    <div className={styles.NavBar}>
      <h3>Conduit</h3>
      {!loading && (
        <nav>
          <ul>
            {linkItem.map(({ to, text }) => (
              <li key={to}>
                <Link to={to}>{text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
