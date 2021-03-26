import { Link } from 'wouter'
import type { Profile } from 'api/api'
import styles from './Avatar.module.css'

type Variant = 'small' | 'normal' | 'large'
export function Avatar({
  profile,
  variant,
}: {
  profile: Profile
  variant: Variant
}) {
  const variantStyle =
    variant === 'small'
      ? styles.avatarSmall
      : variant === 'normal'
      ? styles.avatarNormal
      : variant === 'large'
      ? styles.avatarLarge
      : ''
  return (
    <Link href={`/profile/${profile.username}`}>
      <img
        src={profile.image}
        className={`${styles.avatar} ${variantStyle}`}
        alt=""
      />
    </Link>
  )
}
