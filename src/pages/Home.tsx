import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getTags } from 'features/tags/slice'
import { login } from 'features/user/slice'

export default function Home() {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (!loaded) {
      dispatch(getTags())
      dispatch(
        login({ user: { email: 'marco.ngai@pm.me', password: 'passw0rd' } })
      )
      setLoaded(true)
    }
  }, [loaded, dispatch])
  return (
    <div>
      <button onClick={() => console.log('hi')}>click</button>
      <label>Home</label>
    </div>
  )
}
