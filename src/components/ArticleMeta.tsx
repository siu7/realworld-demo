import { Link } from 'wouter'
import { Profile } from 'api/api'

export const ArticleMeta = ({
  author,
  createdAt,
}: {
  author: Profile
  createdAt: string
}) => (
  <div>
    <Link href={`/profile/${author.username}`}>
      <img src={author.image} alt="avatar" />
    </Link>
    <div>
      <Link href={`/profile/${author.username}`}>{author.username}</Link>
      {createdAt}
    </div>
  </div>
)
