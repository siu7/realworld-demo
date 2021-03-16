import NavBar from 'components/NavBar'
import Routes from 'routes/Routes'
import { useGetCurrentUser } from 'features/user/hooks'

function App() {
  useGetCurrentUser()
  return (
    <div>
      <NavBar />
      <Routes />
    </div>
  )
}

export default App
