import Header from "components/Headers/Header";
import JiraContext from "contexts/JiraContext";
import {useContext, useEffect} from "react";
import {Button, Container} from "reactstrap";
import {api} from "../lib/api";
import {jiraOAuthFlow} from "../lib/api/jira";


const JiraAuth = () => {
    const [jiraAuth, setJiraAuth] = useContext(JiraContext);

    useEffect(() => {

        const OAuthResponse = jiraOAuthFlow()
        if (!OAuthResponse.status) {
            console.log("Authorization not complete yet")
        } else {
            setJiraAuth(OAuthResponse)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const authorizeJira = () => {
        setJiraAuth({...jiraAuth, authCode: api.getJiraAuthCode()})
    };

    return (
        <>
            <Header/>
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
