import { useEffect } from 'react'
import { Link, useRoute } from 'wouter'
import { useAppDispatch } from 'app/hooks'
import { getOne } from 'features/profile/slice'

export default function Profile() {
  const dispatch = useAppDispatch()
  const [match, params] = useRoute('/profile/:username')
  useEffect(() => {
    if (match && params?.username) {
      dispatch(getOne(params.username))
    }
  }, [dispatch, match, params?.username])

  return <label>Profile</label>
}
