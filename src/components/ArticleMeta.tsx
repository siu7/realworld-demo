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
      <img src={author.image} className={styles.avatar} alt="" />
    </Link>
    <div className={styles.username}>
      <Link href={`/profile/${author.username}`}>{author.username}</Link>
      <span>{formatDate(createdAt)}</span>
    </div>
  </div>
)

function formatDate(dateString: string) {
  const d = new Date(dateString)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return `${days[d.getDay()]} ${
    months[d.getMonth()]
  } ${d.getDate()} ${d.getFullYear()}`
}
