import { Link } from 'wouter'
import styles from './Avatar.module.css'

type Variant = 'small' | 'normal' | 'large'
export function Avatar({
  username,
  imageUrl,
  variant,
}: {
  username: string
  imageUrl: string
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
    <Link href={`/profile/${username}`}>
      <img
        src={imageUrl}
        className={`${styles.avatar} ${variantStyle}`}
        alt=""
      />
    </Link>
  )
}
