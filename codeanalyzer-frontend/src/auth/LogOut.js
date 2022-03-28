import { Redirect } from 'react-router-dom'


export const LogOut = () => {
    localStorage.removeItem('token');
    return <Redirect to="/login" />
}

