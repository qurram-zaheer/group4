import axios from "axios";
import Header from "components/Headers/Header";
import JiraContext from "contexts/JiraContext";
import { useEffect, useContext } from "react";
import { Button, Container } from "reactstrap";

const JiraAuth = () => {
  const [jiraAuth, setJiraAuth] = useContext(JiraContext);

  useEffect(() => {
    const getJiraReqs = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      const res = await axios.post("https://auth.atlassian.com/oauth/token", {
        grant_type: "authorization_code",
        client_id: "i3xw91FFYBjOowYsu2dxRvYSi8aUPYDR",
        client_secret:
          "lqUhvU8tz4CU4tmB5IM_fjyub6bTlMonkVKYRHOThxxRsStBlrlUIrbS37BrM484",
        code,
        redirect_uri: "http://localhost:3000/admin/repositories",
      });
      console.log(res);
      const res2 = await axios.get(
        "https://api.atlassian.com/oauth/token/accessible-resources",
        {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`,
            Accept: "application/json",
          },
        }
      );
      console.log(res2);
      // setJiraCloudId(res2.data[0].id);
      // setJiraAuthCode(code);
      // setJiraAccessToken(res.data.access_token);
      // setJiraAuthFlag(true);
      const newJiraAuth = {
        authCode: code,
        authFlag: true,
        accessToken: res.data.access_token,
        cloudId: res2.data[0].id,
      };
      setJiraAuth(newJiraAuth);
      console.log("JIRA AUTH", jiraAuth, newJiraAuth);
    };
    const jiraCode = new URLSearchParams(window.location.search).get("code");
    if (!jiraCode) {
      console.log("Not auth yet");
    } else {
      getJiraReqs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authorizeJira = () => {
    if (!new URLSearchParams(window.location.search).get("code")) {
      window.location.replace(
        // eslint-disable-next-line no-template-curly-in-string
        "https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=i3xw91FFYBjOowYsu2dxRvYSi8aUPYDR&scope=read%3Aapplication-role%3Ajira%20read%3Aaudit-log%3Ajira%20read%3Adashboard%3Ajira%20read%3Adashboard.property%3Ajira%20read%3Afilter%3Ajira%20read%3Afilter.column%3Ajira%20read%3Afilter.default-share-scope%3Ajira%20read%3Agroup%3Ajira%20read%3Aissue%3Ajira%20read%3Aissue-meta%3Ajira%20read%3Aattachment%3Ajira%20read%3Acomment%3Ajira%20read%3Acomment.property%3Ajira%20read%3Afield%3Ajira%20read%3Afield.default-value%3Ajira%20read%3Afield.option%3Ajira%20read%3Afield-configuration-scheme%3Ajira%20read%3Acustom-field-contextual-configuration%3Ajira%20read%3Afield-configuration%3Ajira%20read%3Afield.options%3Ajira%20read%3Aissue-link%3Ajira%20read%3Aissue-link-type%3Ajira%20read%3Anotification-scheme%3Ajira%20read%3Apriority%3Ajira%20read%3Aissue.property%3Ajira%20read%3Aissue.remote-link%3Ajira%20read%3Aresolution%3Ajira%20read%3Aissue-details%3Ajira%20read%3Aissue-security-scheme%3Ajira%20read%3Aissue-type%3Ajira%20read%3Aissue-type-scheme%3Ajira%20read%3Aissue-type-screen-scheme%3Ajira%20read%3Aissue-type.property%3Ajira%20read%3Aissue.watcher%3Ajira%20read%3Aissue-worklog%3Ajira%20read%3Aissue-worklog.property%3Ajira%20read%3Aissue-field-values%3Ajira%20read%3Aissue-security-level%3Ajira%20read%3Aissue-status%3Ajira%20read%3Aissue-type-hierarchy%3Ajira%20read%3Aissue-type-transition%3Ajira%20read%3Aissue.changelog%3Ajira%20read%3Aissue.transition%3Ajira%20read%3Aissue.vote%3Ajira%20read%3Aissue.votes%3Ajira%20read%3Aissue-event%3Ajira%20read%3Auser%3Ajira%20read%3Auser.columns%3Ajira%20read%3Alabel%3Ajira%20read%3Apermission%3Ajira%20read%3Apermission-scheme%3Ajira%20read%3Aproject%3Ajira%20read%3Aworkflow%3Ajira%20read%3Aworkflow-scheme%3Ajira%20read%3Astatus%3Ajira%20read%3Aworkflow.property%3Ajira%20read%3Arole%3Ajira%20read%3Aboard-scope.admin%3Ajira-software%20read%3Aboard-scope%3Ajira-software%20read%3Aepic%3Ajira-software%20read%3Aissue%3Ajira-software%20read%3Asprint%3Ajira-software%20read%3Asource-code%3Ajira-software%20read%3Afeature-flag%3Ajira-software%20read%3Adeployment%3Ajira-software%20read%3Abuild%3Ajira-software%20read%3Aavatar%3Ajira&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fadmin%2Frepositories&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent"
      );
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7">
        {jiraAuth.authFlag ? (
          <></>
        ) : (
          <Button className="btn-icon-clipboard" onClick={authorizeJira}>
            Authorize Jira
          </Button>
        )}
      </Container>
    </>
  );
};

export default JiraAuth;
