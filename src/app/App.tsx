import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { listArticles, feedArticles } from 'features/articles/slice'

function App() {
  const articles = useAppSelector((state) => state.articles)
  const dispatch = useAppDispatch()
  console.log(articles)
  useEffect(() => {
    dispatch(listArticles())
  }, [])
  return <div className="App">test</div>
}

export default App
