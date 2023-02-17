import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return <Navigate to='/' replace />;
  }

  return children;
}
