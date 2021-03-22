import styles from './TagsList.module.css'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setTag, unsetTabsActive, setTagTab } from 'features/articles/slice'

export function TagsList({ tags }: { tags: string[] }) {
  const dispatch = useAppDispatch()

  function handleTagClick(tag: string) {
    dispatch(setTag(tag))
    dispatch(unsetTabsActive())
    dispatch(setTagTab(tag))
  }
  const { loading } = useAppSelector((state) => state.tags.getMany)
  return (
    <div className={styles.wrapper}>
      <p>Popular Tag</p>
      {loading ? (
        <label>loading...</label>
      ) : (
        <div className={styles.tagsList}>
          {tags.map((tag) => (
            <span key={`tag-${tag}`} onClick={() => handleTagClick(tag)}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
