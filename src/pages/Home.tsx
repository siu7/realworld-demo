import {
  useListArticles,
  useArticlesParams,
  useFeedArticles,
} from 'features/articles/hooks'
import { useGetTags } from 'features/tags/hooks'
import { useAppSelector } from 'app/hooks'

export default function Home() {
  const { authed } = useAppSelector((state) => state.user)
  const { articles, feedArticlesloading } = useFeedArticles()
  //const { articles, listArticlesloading } = useListArticles()
  //const { tags, getTagsLoading } = useGetTags()
  //const { addTag, removeTag } = useArticlesParams()
  //console.log(articles, listArticlesloading)
  //console.log(tags, getTagsLoading)
  return (
    <div>
      <label>Home</label>
    </div>
  )
}
