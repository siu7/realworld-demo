import { Link } from 'wouter'
import { Profile } from 'api/api'
import styles from './ArticleMeta.module.css'

export const ArticleMeta = ({
  author,
  createdAt,
}: {
  author: Profile
  createdAt: string
}) => (
  <div className={styles.meta}>
    <Link href={`/profile/${author.username}`}>
      <img src={author.image} alt="avatar" className={styles.avatar} />
    </Link>
    <div>
      <Link href={`/profile/${author.username}`}>{author.username}</Link>
      {createdAt}
    </div>
  </div>
)
