import { useLocation } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { favoriteOne, unfavoriteOne } from 'features/articles/slice'
import styles from './FavoriteButton.module.css'

export function FavoriteButton({
  favorited,
  slug,
  favoritesCount,
  isCompact,
}: {
  favorited: boolean
  slug: string
  favoritesCount: number
  isCompact: boolean
}) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user.data)
  const [, setLocation] = useLocation()

  const { loading: favoriteLoading } = useAppSelector(
    (state) => state.articles.favoriteOne
  )
  const { loading: unfavoriteLoading } = useAppSelector(
    (state) => state.articles.unfavoriteOne
  )
  function handleFavorite(favorited: boolean, slug: string) {
    !user
      ? setLocation('/signup')
      : !favorited
      ? dispatch(favoriteOne(slug))
      : dispatch(unfavoriteOne(slug))
  }
  const text = isCompact
    ? favoritesCount
    : favorited
    ? `Unfavorite Article (${favoritesCount})`
    : `Favorite Article (${favoritesCount})`
  return (
    <button
      disabled={favoriteLoading || unfavoriteLoading}
      onClick={() => handleFavorite(favorited, slug)}
      className={`${styles.button} ${favorited && styles.buttonFavorited}`}
    >
      <HeartSvg />
      {text}
    </button>
  )
}

const HeartSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
)
