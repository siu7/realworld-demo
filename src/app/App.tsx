import { Switch, Route } from 'wouter'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Signup from 'pages/Signup'
import Settings from 'pages/Settings'
import Editor from 'pages/Editor'
import EditArticle from 'pages/Editor/EditArticle'
import Article from 'pages/Article'
import Profile from 'pages/Profile'
import Favorites from 'pages/Profile/Favorites'
import { useInitReduxStateByUrl } from 'app/useInitReduxStateByUrl'
import NavBar from 'app/NavBar'
import { useAppSelector } from 'app/hooks'
import ProtectedRoute from 'app/ProtectedRoute'
import AuthedDisabledRoute from 'app/AuthedDisabledRoute'

function App() {
  useInitReduxStateByUrl()
  const { authed } = useAppSelector((state) => state.user)

  return (
    <div>
      <NavBar />
      <Switch>
        <AuthedDisabledRoute path="/login" component={Login} authed={authed} />
        <AuthedDisabledRoute
          path="/signup"
          component={Signup}
          authed={authed}
        />
        <ProtectedRoute path="/settings" component={Settings} authed={authed} />
        <ProtectedRoute path="/editor" component={Editor} authed={authed} />
        <ProtectedRoute
          path="/editor/:slug"
          component={EditArticle}
          authed={authed}
        />
        <Route path="/article/:slug" component={Article} />
        <Route path="/profile/:username" component={Profile} />
        <Route path="/profile/:username/favorite" component={Favorites} />
        <Route path="/" component={Home} />
        <Route path="/:rest*">
          {(params) => `404, Sorry the page ${params.rest} does not exist!`}
        </Route>
      </Switch>
    </div>
  )
}

export default App
