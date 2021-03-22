import { Link } from 'wouter'
import { useAppSelector } from 'app/hooks'
import styles from './Header.module.css'

export default function Header() {
  const { user } = useAppSelector((state) => state.user.data)
  const { loading } = useAppSelector((state) => state.user.getCurrent)
  let linkItem = [{ to: '/', text: 'Home' }]
  if (user?.username) {
    linkItem.push(
      { to: '/editor', text: 'New Article' },
      { to: '/settings', text: 'Settings' },
      { to: `/profile/${user.username}`, text: user.username }
    )
  } else {
    linkItem.push(
      { to: '/login', text: 'Login' },
      { to: '/signup', text: 'Signup' }
    )
  }

  return (
    <div className={`container ${styles.header}`}>
      <h3 className={styles.brand}>
        <Link to="/">Conduit</Link>
      </h3>
      {!loading && (
        <nav className={styles.navList}>
          {linkItem.map(({ to, text }) => (
            <Link to={to} key={to}>
              {text}
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
