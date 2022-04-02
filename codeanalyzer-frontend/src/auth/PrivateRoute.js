import {Redirect, Route} from 'react-router-dom'
import {useUser} from './useUser';
import useQuery from "../hooks/useQuery";

export const PrivateRoute = props => {
    const query = useQuery();
    const user = useUser();
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const sleeper = async () => {
        await sleep(5000)
    }
    if (!user && !query.get("access_token")) {
        return <Redirect to="/login"/>
    }

    return <Route {...props}/>
}
