import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getCurrent } from 'features/user/slice'
import Header from 'components/Header'
import Routes from 'routes/Routes'

function App() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user.data)
  const { loading } = useAppSelector((state) => state.user.getCurrent)
  useEffect(() => {
    let token = localStorage.getItem('jwtToken')
    if (!user && token) dispatch(getCurrent())
  }, [dispatch, user])

  return (
    <>
      <Header />
      <Routes />
    </>
  )
}

export default App
