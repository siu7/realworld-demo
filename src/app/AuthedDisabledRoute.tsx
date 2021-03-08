import { Route, RouteProps, Redirect } from 'wouter'
interface AuthedDisabledRouteProps extends RouteProps {
  authed: boolean
}
export default function AuthedDisabledRoute({
  authed,
  ...props
}: AuthedDisabledRouteProps) {
  if (!authed) {
    return <Route {...props} />
  } else {
    return <Redirect to={'/'} />
  }
}
