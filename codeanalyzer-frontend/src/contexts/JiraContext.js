import React from "react";

const JiraContext = React.createContext([
    {authCode: "", authFlag: "", accessToken: "", cloudId: "", refreshToken: ""},
    () => {
    },
]);

export default JiraContext;
