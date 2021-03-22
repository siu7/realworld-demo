import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { UpdateArticleBody, CreateArticleBody } from 'api/api'
import { useForm } from 'utils/useForm'
import { updateOne, createOne } from 'features/articles/slice'
import { ErrorsList } from 'components/ErrorsList'
import styles from './Login.module.css'

export default function Editor() {
  const dispatch = useAppDispatch()
  const { loading, errors } = useAppSelector(
    (state) => state.articles.createOne
  )
  //const { article } = useAppSelector((state) => state.articles.data)
  const {
    formData,
    handleInputChange,
    handleSubmit,
    handleTextAreaChange,
  } = useForm<
    Omit<CreateArticleBody['article'], 'tagList'> & { tagList: string }
  >(
    {
      title: '',
      description: '',
      body: '',
      tagList: '',
    },
    () => handleCreate()
  )
  function handleCreate() {
    let tmp = JSON.parse(JSON.stringify(formData))
    tmp.tagList = formData.tagList.split(',').map((item) => item.trim())
    dispatch(createOne(tmp))
  }
  const { title, description, body, tagList } = formData
  return (
    <form onSubmit={handleSubmit} className={`${styles.form} container`}>
      {errors && <ErrorsList errors={errors} />}
      <input
        type="text"
        name="title"
        placeholder="Article Title"
        value={title}
        onChange={handleInputChange}
        disabled={loading}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="What's this article about?"
        value={description}
        onChange={handleInputChange}
        disabled={loading}
        required
      />
      <textarea
        name="body"
        placeholder="Write your article (in markdown)"
        value={body}
        onChange={handleTextAreaChange}
        rows={4}
        disabled={loading}
        required
      />
      <input
        type="text"
        name="tagList"
        placeholder="Enter tags"
        value={tagList}
        onChange={handleInputChange}
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading} className={styles.submitButton}>
        Publish Article
      </button>
    </form>
  )
}
