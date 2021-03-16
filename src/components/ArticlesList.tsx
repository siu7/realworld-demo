import { Article } from 'api/api'
import {
  useFavoriteArticle,
  useUnfavoriteArticle,
} from 'features/articles/hooks'

export default function ArticlesList({ articles }: { articles: Article[] }) {
  const { favoriteArticle, loading: favoriteLoading } = useFavoriteArticle()
  const {
    unfavoriteArticle,
    loading: unfavoriteLoading,
  } = useUnfavoriteArticle()
  return (
    <div>
      {articles.map(
        ({
          title,
          slug,
          createdAt,
          description,
          favorited,
          favoritesCount,
          tagList,
          author,
        }) => (
          <div key={slug}>
            <div>
              {author.image}
              <div>
                {author.username}
                {createdAt}
              </div>
              <div>
                <button
                  disabled={favoriteLoading || unfavoriteLoading}
                  onClick={() =>
                    favorited ? unfavoriteArticle(slug) : favoriteArticle(slug)
                  }
                >
                  {favoritesCount}
                </button>
              </div>
            </div>
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <div>
              readmore
              {tagList}
            </div>
          </div>
        )
      )}
    </div>
  )
}
