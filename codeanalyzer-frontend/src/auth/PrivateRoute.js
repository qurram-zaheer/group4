import {Redirect, Route} from 'react-router-dom'
import {useUser} from './useUser';
import useQuery from "../hooks/useQuery";

export const PrivateRoute = props => {
    const query = useQuery();
    const user = useUser();
    console.log('USER HERE', user)

    if (!user && !query.get("access_token")) {
        console.log('oh no shit fuck oh no shit fuck')
        return <Redirect to="/login"/>
    }

    return <Route {...props}/>
}
