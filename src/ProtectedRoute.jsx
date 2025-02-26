import {Navigate} from 'react-router';
import {useAuth} from './AuthContext';

const ProtectedRoute = ({children}) => {
    const {isLoggedIn} = useAuth();
    return isLoggedIn ? children : <Navigate to="/"/>
}

export default ProtectedRoute