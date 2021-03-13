import { useGetArticles, useUpdateArticle } from 'features/articles/hooks'

export default function Home() {
  const { articles, loading, error } = useGetArticles()
  const { updateArticle } = useUpdateArticle()
  console.log(articles, loading, error)

  return (
    <div>
      <label>Home</label>
    </div>
  )
}
