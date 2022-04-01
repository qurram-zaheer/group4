import React, {useMemo, useState} from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import JiraContext from "contexts/JiraContext";
import GithubContext from "./contexts/GithubContext";
import AddRepos from "./views/AddRepos";

const App = (props) => {
    const jiraHook = useState({
        authCode: "",
        authFlag: "",
        accessToken: "",
        cloudId: "",
    });
    const [user, setUser] = useState()
    const githubHook = useMemo(() => ({user, setUser}), [user])
    return (<div>
            <GithubContext.Provider value={githubHook}>
                <JiraContext.Provider value={jiraHook}>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/auth" render={(props) => <AuthLayout {...props} />}/>
                            <Route path="/admin" render={(props) => <AdminLayout {...props} />}/>
                            <Route path="/add-repos" render={() => <AddRepos/>}/>
                            <Redirect from="/" to="/auth/login"/>
                        </Switch>
                    </BrowserRouter>
                </JiraContext.Provider>
            </GithubContext.Provider>
        </div>
    );
};

export default App;
