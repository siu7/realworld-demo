import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
      <h3>Conduit</h3>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
