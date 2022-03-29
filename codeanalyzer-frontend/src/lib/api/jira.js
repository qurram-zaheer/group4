import {get, post} from "../../config";

export const getJiraAuthCode = () => {
    const firstStepCode = new URLSearchParams(window.location.search).get("code")
    if (!firstStepCode) {
        window.location.replace(
            // eslint-disable-next-line no-template-curly-in-string
            "https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=i3xw91FFYBjOowYsu2dxRvYSi8aUPYDR&scope=offline_access%20read%3Acomment.property%3Ajira%20read%3Acomment%3Ajira%20read%3Auser.columns%3Ajira%20read%3Auser-configuration%3Ajira%20read%3Asource-code%3Ajira-software%20read%3Afeature-flag%3Ajira-software%20read%3Aremote-link%3Ajira-software%20read%3Aproject%3Ajira%20read%3Aapplication-role%3Ajira%20read%3Aaudit-log%3Ajira%20read%3Adashboard%3Ajira%20read%3Adashboard.property%3Ajira%20read%3Afilter%3Ajira%20read%3Afilter.column%3Ajira%20read%3Agroup%3Ajira%20read%3Aissue%3Ajira%20read%3Aissue-meta%3Ajira%20read%3Afield%3Ajira%20read%3Afield.default-value%3Ajira%20read%3Aissue-link%3Ajira%20read%3Aissue-link-type%3Ajira%20read%3Apriority%3Ajira%20read%3Aissue.property%3Ajira%20read%3Aissue.remote-link%3Ajira%20read%3Aresolution%3Ajira%20read%3Aissue-details%3Ajira%20read%3Aissue-type%3Ajira%20read%3Aissue-type-scheme%3Ajira%20read%3Aissue-type-screen-scheme%3Ajira%20read%3Aissue-type.property%3Ajira%20read%3Aissue.watcher%3Ajira%20read%3Aissue-worklog%3Ajira%20read%3Aissue-worklog.property%3Ajira%20read%3Aissue-field-values%3Ajira%20read%3Aissue-status%3Ajira%20read%3Aissue-type-hierarchy%3Ajira%20read%3Aissue-type-transition%3Ajira%20read%3Aissue.changelog%3Ajira%20read%3Aissue.transition%3Ajira%20read%3Aissue-event%3Ajira%20read%3Ajira-expressions%3Ajira%20read%3Auser%3Ajira%20read%3Alabel%3Ajira%20read%3Aproject-category%3Ajira%20read%3Aproject-role%3Ajira%20read%3Aproject.property%3Ajira%20read%3Aproject-version%3Ajira%20read%3Aproject.feature%3Ajira%20read%3Ascreen%3Ajira%20read%3Ascreen-scheme%3Ajira%20read%3Ascreenable-field%3Ajira%20read%3Ascreen-tab%3Ajira%20read%3Aissue.time-tracking%3Ajira%20read%3Auser.property%3Ajira%20read%3Awebhook%3Ajira%20read%3Aworkflow%3Ajira%20read%3Aworkflow-scheme%3Ajira%20read%3Astatus%3Ajira%20read%3Aworkflow.property%3Ajira%20read%3Ainstance-configuration%3Ajira%20read%3Ajql%3Ajira%20read%3Aproject-type%3Ajira%20read%3Aproject.email%3Ajira%20read%3Arole%3Ajira%20read%3Aboard-scope.admin%3Ajira-software%20read%3Aboard-scope%3Ajira-software%20read%3Aepic%3Ajira-software%20read%3Aissue%3Ajira-software%20read%3Asprint%3Ajira-software&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fadmin%2Frepositories&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent"
        );
    }
    return firstStepCode
}

export const getJiraAccessToken = async (jiraCode) => {
    const res = await post("https://auth.atlassian.com/oauth/token", {
        grant_type: "authorization_code",
        client_id: "i3xw91FFYBjOowYsu2dxRvYSi8aUPYDR",
        client_secret:
            "lqUhvU8tz4CU4tmB5IM_fjyub6bTlMonkVKYRHOThxxRsStBlrlUIrbS37BrM484",
        code: jiraCode,
        redirect_uri: "http://localhost:3000/admin/repositories",
    });
    console.log("Access token received")
    return {accessToken: res.data.access_token || "", refreshToken: res.data.refresh_token || ""}
}

export const getJiraCloudId = async (accessToken) => {
    console.log("Cloud ID", accessToken)
    const res = await get(
        "https://api.atlassian.com/oauth/token/accessible-resources",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/json",
            },
        }
    );
    console.log("Cloud ID received")
    return {cloudId: res.data[0].id || ""}
}

export const jiraOAuthFlow = async () => {
    const jiraCode = getJiraAuthCode()
    const {accessToken, refreshToken} = await getJiraAccessToken(jiraCode)
    console.log(accessToken, refreshToken);

    const {cloudId} = await getJiraCloudId(accessToken)

    const newJiraAuth = {
        authCode: jiraCode,
        accessToken: accessToken,
        cloudId: cloudId,
        refreshToken: refreshToken,
        kind: "Jira"
    };

    // await api.createAuths(newJiraAuth, {'Authorization': `Bearer ${localStorage.getItem('token')}`})

};


export default {getJiraAuthCode, getJiraAccessToken, getJiraCloudId, jiraOAuthFlow}