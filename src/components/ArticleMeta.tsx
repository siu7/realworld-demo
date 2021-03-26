import { Link } from 'wouter'
import { Profile } from 'api/api'
import styles from './ArticleMeta.module.css'
import { formatDate } from 'utils/formatDate'
import { Avatar } from 'components/Avatar'

export const ArticleMeta = ({
  author,
  createdAt,
}: {
  author: Profile
  createdAt: string
}) => (
  <div className={styles.meta}>
    <Avatar profile={author} variant="small" />
    <div className={styles.username}>
      <Link href={`/profile/${author.username}`}>{author.username}</Link>
      <span>{formatDate(createdAt)}</span>
    </div>
  </div>
)
