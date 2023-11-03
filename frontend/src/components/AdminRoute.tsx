import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const AdminRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth)

  if (!userInfo?.isAdmin) {
    return <Navigate to='/login' replace />
  }
  return <Outlet />
}

export default AdminRoute
