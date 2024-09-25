
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../AuthProvider/AuthProvider';



const PrivateRoute = ({ children }) => {
  // const { user, loading } = useContext()
  const { loading, user } = useContext(AuthContext);
  const location = useLocation()

  if (loading) return <span className="loading loading-spinner loading-lg"></span>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute