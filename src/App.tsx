import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getCurrent } from 'features/user/slice'
import { isAuthedSelector } from 'features/user/selectors'
import NavBar from 'components/NavBar'
import Routes from 'routes/Routes'

function App() {
  const dispatch = useAppDispatch()
  const isAuthed = useAppSelector(isAuthedSelector)
  useEffect(() => {
    let token = localStorage.getItem('jwtToken')
    if (!isAuthed && token) dispatch(getCurrent())
  }, [dispatch, isAuthed])

  return (
    <div>
      <NavBar />
      <Routes />
    </div>
  )
}

export default App
