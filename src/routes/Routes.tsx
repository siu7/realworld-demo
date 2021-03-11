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
import { useAppSelector } from 'app/hooks'
import ProtectedRoute from 'routes/ProtectedRoute'
import AuthedDisabledRoute from 'routes/AuthedDisabledRoute'

export function Routes() {
  //const { authed } = useAppSelector((state) => state.user)
  const authed = false

  return (
    <Switch>
      <AuthedDisabledRoute path="/login" component={Login} authed={authed} />
      <AuthedDisabledRoute path="/signup" component={Signup} authed={authed} />
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
  )
}

export default Routes
