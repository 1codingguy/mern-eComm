import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth)

  if (!userInfo) {
    return <Navigate to='/login' replace/>
  }
  return <Outlet />
}

export default PrivateRoute
