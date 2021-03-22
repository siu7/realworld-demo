import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getCurrent } from 'features/user/slice'
import Header from 'components/Header'
import Routes from 'routes/Routes'

function App() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user.data)
  let token = localStorage.getItem('jwtToken')
  useEffect(() => {
    if (!user && token) dispatch(getCurrent())
  }, [dispatch, user, token])

  return (
    <>
      <Header />
      {(user || !token) && <Routes />}
    </>
  )
}

export default App
