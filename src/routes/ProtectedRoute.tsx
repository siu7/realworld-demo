import { Route, RouteProps, Redirect } from 'wouter'
interface ProtectedRouteProps extends RouteProps {
  authed: boolean
}
export default function ProtectedRoute({
  authed,
  ...props
}: ProtectedRouteProps) {
  if (authed) {
    return <Route {...props} />
  } else {
    return <Redirect to={'/'} />
  }
}
