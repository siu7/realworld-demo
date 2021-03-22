import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ArticlesList } from 'components/ArticlesList'
import {
  getMany,
  getArticlesByTag,
  setPreviousActiveTab,
  getArticlesFeeds,
} from 'features/articles/slice'
import { getMany as getTags } from 'features/tags/slice'
import { Banner } from 'components/Banner'
import { TagsList } from 'components/TagsList'
import styles from './Home.module.css'
import { ArticlesTab } from 'components/ArticlesTab'

export default function Home() {
  const dispatch = useAppDispatch()
  const { articles, articlesByTag, articlesFeeds, limit } = useAppSelector(
    (state) => state.articles.data
  )
  useEffect(() => {
    if (articles.articles.length === 0)
      dispatch(getMany({ offset: articles.offset, limit }))
  }, [dispatch, articles.offset, limit, articles.articles.length])

  const { tag } = useAppSelector(
    (state) => state.articles.data.getArticlesFilter
  )
  useEffect(() => {
    if (tag && articlesByTag.articles.length === 0)
      dispatch(getArticlesByTag({ tag, limit, offset: articlesByTag.offset }))
  }, [
    dispatch,
    limit,
    tag,
    articlesByTag.offset,
    articlesByTag.articles.length,
  ])

  const { user } = useAppSelector((state) => state.user.data)
  useEffect(() => {
    if (
      articlesFeeds.articles.length === 0 &&
      user &&
      articlesFeeds.articlesCount === undefined
    )
      dispatch(getArticlesFeeds({ offset: articlesFeeds.offset, limit }))
  }, [
    dispatch,
    articlesFeeds.offset,
    limit,
    articlesFeeds.articles.length,
    user,
  ])

  const { tags } = useAppSelector((state) => state.tags.data)
  useEffect(() => {
    if (tags.length === 0) dispatch(getTags())
  }, [dispatch, tags])

  const { loading: getArticlesByTagLoading } = useAppSelector(
    (state) => state.articles.getArticlesByTag
  )
  const { loading: getManyLoading } = useAppSelector(
    (state) => state.articles.getMany
  )
  const loading = getArticlesByTagLoading || getManyLoading

  const { articleTabs } = useAppSelector((state) => state.articles.data)
  let activeTabs = articleTabs.find((tab) => tab.active === true)

  useEffect(() => {
    return () => {
      dispatch(setPreviousActiveTab())
    }
  }, [])
  return (
    <div>
      <Banner>
        <h1>conduit</h1>
        <p>A place to share your knowledge.</p>
      </Banner>
      <div className={`container ${styles.grid}`}>
        <div className={styles.articles}>
          <ArticlesTab />
          {loading ? (
            <label>loading...</label>
          ) : (
            <ArticlesList
              articlesSet={
                activeTabs?.type === 'tag'
                  ? articlesByTag
                  : activeTabs?.type === 'feed'
                  ? articlesFeeds
                  : articles
              }
            />
          )}
        </div>
        <div className={styles.tags}>
          <TagsList tags={tags} />
        </div>
      </div>
    </div>
  )
}
