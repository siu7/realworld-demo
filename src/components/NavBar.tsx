import { Link } from 'wouter'
import { useAppSelector } from 'app/hooks'

export default function NavBar() {
  //const { authed, user } = useAppSelector((state) => state.user)
  let linkItem = [{ to: '/', text: 'Home' }]
  //if (authed && user) {
  //linkItem.push(
  //{ to: '/settings', text: 'Settings' },
  //{ to: '/editor', text: 'New Article' },
  //{ to: `/profile/${user.username}`, text: user.username }
  //)
  //} else {
  linkItem.push(
    { to: '/login', text: 'Login' },
    { to: '/signup', text: 'Signup' }
  )
  //}

  return (
    <div>
      <h3>Conduit</h3>
      <nav>
        <ul>
          {linkItem.map(({ to, text }) => (
            <li key={to}>
              <Link to={to}>{text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
