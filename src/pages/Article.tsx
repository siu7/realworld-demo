import { useGetArticle } from 'features/articles/hooks'

export default function Article() {
  const { article, getArticleLoading } = useGetArticle()
  console.log(article, getArticleLoading)
  return <label>Article</label>
}
