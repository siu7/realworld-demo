import { useGetProfile } from 'features/profile/hooks'

export default function Profile() {
  const { profile, getProfileLoading } = useGetProfile()
  console.log(profile, getProfileLoading)
  return <label>Profile</label>
}
