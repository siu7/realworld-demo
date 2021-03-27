import { useEffect, useState } from 'react'
import { useLocation, useRoute } from 'wouter'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { CreateArticleBody } from 'api/api'
import { useForm } from 'utils/useForm'
import { updateOne, createOne, getOne } from 'features/articles/slice'
import { ErrorsList } from 'components/ErrorsList'
import styles from './Login.module.css'

export default function Editor() {
  const dispatch = useAppDispatch()
  const [, setLocation] = useLocation()
  const [, params] = useRoute('/editor/:slug')
  useEffect(() => {
    if (params?.slug) dispatch(getOne(params?.slug))
  }, [dispatch, params?.slug])

  const { loading, errors } = useAppSelector(
    (state) => state.articles.createOne
  )
  const { article } = useAppSelector((state) => state.articles.data)
  const { user } = useAppSelector((state) => state.user.data)
  const updatingArticle = article?.author.username === user?.username

  const {
    formData,
    setFormData,
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
    () => handleCreateOrUpdate()
  )
  const [updated, setUpdated] = useState(false)
  useEffect(() => {
    if (article && !updated && updatingArticle) {
      setFormData({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList.toString(),
      })
      setUpdated(true)
    }
  }, [article, updated, setUpdated, setFormData, updatingArticle])

  async function handleCreateOrUpdate() {
    let tmp = JSON.parse(JSON.stringify(formData))
    tmp.tagList = formData.tagList.split(',').map((item) => item.trim())
    updatingArticle && article
      ? await dispatch(updateOne({ slug: article.slug, body: tmp }))
      : await dispatch(createOne(tmp))
    setLocation(`/profile/${user?.username}`)
  }
  const { title, description, body, tagList } = formData

  return (
    <form onSubmit={handleSubmit} className={`form mw-4 container`}>
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
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className={`${styles.submitButton} primary-btn`}
      >
        Publish Article
      </button>
    </form>
  )
}
