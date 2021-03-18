import { useLocation } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { isAuthedSelector } from 'features/user/selectors'
import { favoriteOne, unfavoriteOne } from 'features/articles/slice'

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
  const isAuthed = useAppSelector(isAuthedSelector)
  const [, setLocation] = useLocation()

  const { loading: favoriteLoading } = useAppSelector(
    (state) => state.articles.favoriteOne
  )
  const { loading: unfavoriteLoading } = useAppSelector(
    (state) => state.articles.unfavoriteOne
  )
  function handleFavorite(favorited: boolean, slug: string) {
    !isAuthed
      ? setLocation('/signup')
      : !favorited
      ? dispatch(favoriteOne(slug))
      : dispatch(unfavoriteOne(slug))
  }
  return (
    <button
      disabled={favoriteLoading || unfavoriteLoading}
      onClick={() => handleFavorite(favorited, slug)}
    >
      {isCompact ? 'H' : favorited ? 'Unfavorite Article' : 'Favorite Article'}
      {favoritesCount}
    </button>
  )
}
