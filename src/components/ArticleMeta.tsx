import { Link } from 'wouter'
import { Profile } from 'api/api'
import styles from './ArticleMeta.module.css'
import { formatDate } from 'utils/formatDate'

export const ArticleMeta = ({
  author,
  createdAt,
}: {
  author: Profile
  createdAt: string
}) => (
  <div className={styles.meta}>
    <Link href={`/profile/${author.username}`}>
      <img src={author.image} className={styles.avatar} alt="" />
    </Link>
    <div className={styles.username}>
      <Link href={`/profile/${author.username}`}>{author.username}</Link>
      <span>{formatDate(createdAt)}</span>
    </div>
  </div>
)
