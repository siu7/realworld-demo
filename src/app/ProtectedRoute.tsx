import { Route, RouteProps, Redirect } from 'wouter'
interface ProtectedRouteProps extends RouteProps {
  isAuth: boolean
}
export default function ProtectedRoute({
  isAuth,
  ...props
}: ProtectedRouteProps) {
  if (isAuth) {
    return <Route {...props} />
  } else {
    return <Redirect to={'/'} />
  }
}
