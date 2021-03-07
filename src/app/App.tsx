import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  useLocation,
} from 'react-router-dom'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Signup from 'pages/Signup'
import Settings from 'pages/Settings'
import Editor from 'pages/Editor'
import EditArticle from 'pages/Editor/EditArticle'
import Article from 'pages/Article'
import Profile from 'pages/Profile'
import Favorites from 'pages/Profile/Favorites'

function App() {
  const params = useParams()
  const location = useLocation()
  console.log(params, location)
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/editor">
          <Editor />
        </Route>
        <Route path="/editor/:slug">
          <EditArticle />
        </Route>
        <Route path="/article/:slug">
          <Article />
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/profile/:username/favorite">
          <Favorites />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
