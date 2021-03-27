import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ArticlesList } from 'components/ArticlesList'
import {
  getMany,
  getArticlesFeeds,
  unsetArticle,
} from 'features/articles/slice'
import { getMany as getTags } from 'features/tags/slice'
import { Banner } from 'components/Banner'
import { TagsList } from 'components/TagsList'
import styles from './Home.module.css'
import { ArticlesTab } from 'components/ArticlesTab'

export default function Home() {
  const dispatch = useAppDispatch()
  const { offset, limit } = useAppSelector((state) => state.articles.data)
  const { tag } = useAppSelector(
    (state) => state.articles.data.getArticlesFilter
  )
  const { articleTabs } = useAppSelector((state) => state.articles.data)
  let activeTab = articleTabs.find((tab) => tab.active === true)
  useEffect(() => {
    if (activeTab?.type === 'global') {
      dispatch(getMany({ offset, limit }))
    }
    if (activeTab?.type === 'tag') {
      dispatch(getMany({ tag, offset, limit }))
    }
    if (activeTab?.type === 'feed') {
      dispatch(getArticlesFeeds({ offset, limit }))
    }
  }, [dispatch, offset, limit, tag, activeTab?.type])

  const { tags } = useAppSelector((state) => state.tags.data)
  useEffect(() => {
    if (tags.length === 0) dispatch(getTags())
  }, [dispatch, tags])

  const { loading: getManyLoading } = useAppSelector(
    (state) => state.articles.getMany
  )
  const { loading: getArticlesFeedsLoading } = useAppSelector(
    (state) => state.articles.getArticlesFeeds
  )
  const loading = getManyLoading || getArticlesFeedsLoading
  useEffect(() => {
    return () => {
      dispatch(unsetArticle())
    }
  }, [])

  return (
    <div>
      <Banner>
        <h1>conduit</h1>
        <h2>A place to share your knowledge.</h2>
      </Banner>
      <div className={`container ${styles.grid}`}>
        <div className={styles.articles}>
          <ArticlesTab />
          {loading ? <label>loading...</label> : <ArticlesList />}
        </div>
        <div className={styles.tags}>
          <TagsList tags={tags} />
        </div>
      </div>
    </div>
  )
}
