import { Route, RouteProps, Redirect } from 'wouter'
interface AuthedDisabledRouteProps extends RouteProps {
  isAuth: boolean
}
export default function AuthedDisabledRoute({
  isAuth,
  ...props
}: AuthedDisabledRouteProps) {
  if (!isAuth) {
    return <Route {...props} />
  } else {
    return <Redirect to={'/'} />
  }
}
