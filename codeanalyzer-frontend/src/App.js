import React, { useState } from "react";
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import JiraContext from "contexts/JiraContext";

const App = (props) => {
  const jiraHook = useState({
    authCode: "",
    authFlag: "",
    accessToken: "",
    cloudId: "",
  });
  return (
    <JiraContext.Provider value={jiraHook}>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      </BrowserRouter>
    </JiraContext.Provider>
  );
};

export default App;
