import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getCurrent } from 'features/user/slice'
import { isAuthedSelector } from 'features/user/selectors'
import Header from 'components/Header'
import Routes from 'routes/Routes'

function App() {
  const dispatch = useAppDispatch()
  const isAuthed = useAppSelector(isAuthedSelector)
  useEffect(() => {
    let token = localStorage.getItem('jwtToken')
    if (!isAuthed && token) dispatch(getCurrent())
  }, [dispatch, isAuthed])

  return (
    <>
      <Header />
      <Routes />
    </>
  )
}

export default App
