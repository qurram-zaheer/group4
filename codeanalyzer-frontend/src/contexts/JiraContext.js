import React from "react";

const JiraContext = React.createContext([
  { authCode: "", authFlag: "", accessToken: "", cloudId: "" },
  () => {
    console.log("in here?");
  },
]);

export default JiraContext;
