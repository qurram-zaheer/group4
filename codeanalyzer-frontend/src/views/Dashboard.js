/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useState, useContext } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Bar, Line } from "react-chartjs-2";

import useQuery from "../hooks/useQuery";
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Progress,
    Row,
    Table,
} from "reactstrap";

// core components
import { chartExample1, chartExample2, chartOptions, parseOptions, } from "variables/charts.js";
import GithubContext from "../contexts/GithubContext"
import { api } from "../lib/api"

import Header from "components/Headers/Header.js";

const Dashboard = (props) => {
    const [activeNav, setActiveNav] = useState(1);
    const query = useQuery();
    const [chartExample1Data, setChartExample1Data] = useState("data1");
    const [repositoryCounts, setRepositoryCounts] = useState(0);
    const [contributorCounts, setContributorCounts] = useState(0);
    const [refactoringCounts, setRefactoringCounts] = useState(0);
    const [refactoringsChartData, setRefactoringsChartData] = useState([]);
    const [commitsChartData, setCommitsChartData] = useState([]);
    const { user, setUser } = useContext(GithubContext);

    useEffect(() => {
        ; (async () => {
            const accessToken = query.get('access_token');
            console.log(accessToken)
            const refreshToken = query.get('refresh_token');
            const expiresIn = query.get('raw[expires_in]');
            // console.log('AT->', accessToken, refreshToken, expiresIn);
            const userRegistration = await api.authGithubUser(accessToken);
            console.log('UR', userRegistration);
            // console.log('UR->', userRegistration);
            if (userRegistration && userRegistration.data.user) {
                // console.log('CGA', userRegistration.data.user, userRegistration.data.user, accessToken, refreshToken, expiresIn);
                const createGithubAuth = await createGithubAuths(userRegistration.data.user, accessToken, refreshToken, expiresIn, {
                    headers: {
                        'Authorization': 'Bearer ' + userRegistration.data.jwt
                    }
                });
                if (createGithubAuth) {
                    console.log('User Registration was Successful!');
                    console.log("CGA", createGithubAuth.data.data.attributes.user.data, createGithubAuth, accessToken);
                    await setUser({
                        ...createGithubAuth.data.data.attributes.user.data,
                        accessToken,
                    });
                    console.log('user', user);
                    await localStorage.setItem(
                        "strapiUserId",
                        createGithubAuth.data.data.attributes.user.data.id
                    );
                }
            }
            console.log('user', user);
            await localStorage.setItem("token", userRegistration.data.jwt)
            await localStorage.setItem("githubToken", accessToken)

            fetchDashboardData();
        })()
    }, []);

    const fetchDashboardData = async () => {
        console.log('inside!!!');
        const accessToken = await localStorage.getItem("token");
        const repoCount = await api.getRepositoriesCount(null, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        if (repoCount) {
            console.log("RC", repoCount);
            setRepositoryCounts(repoCount.data);
        }
        const contCount = await api.getContributorsCount(null, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        if (contCount) {
            console.log("CC", contCount);
            setContributorCounts(contCount.data);
        }
        const refactoringCount = await api.getTotalRefactorings(null, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        if(refactoringCount){
            console.log("RC", refactoringCount);
            setRefactoringCounts(refactoringCount.data);
        }
        const refactoringChartData = await api.getRefactoringData(null, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        if(refactoringChartData){
            console.log('RCD', refactoringChartData)
            setRefactoringsChartData(refactoringChartData.data.data);
        }
        const commitChartData = await api.getCommitsCountByRepo(null, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
        if(commitChartData){
            console.log('CCD', commitChartData)
            setCommitsChartData(commitChartData.data);
        }
    }

    var refactoringChartDataFeed = {
        labels: refactoringsChartData.map(function (item) {
            return item.attributes.commitdate.slice(0, 10);
          }),
          datasets: [{
            label: "Total Refactorings Done Across Repos By Date",
            data: refactoringsChartData.map(function (item) {
              return item.attributes.totalchanges;
            }),
          }]
    }

    var commitByRepoDataFeed = {
        labels: Object.keys(commitsChartData),
          datasets: [{
            label: "Commits By Repo",
            data: Object.values(commitsChartData),
          }]
    }

    const createGithubAuths = async (user, accessToken, refreshToken, expiresIn, headers) => {
        try {
            console.log('Headers', headers);
            return await api.createAuths({
                data: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    expiresIn: expiresIn,
                    'user': user.id,
                    kind: 'Github',
                }
            }, headers);
        } catch (err) {
            console.error('Unable to add Github Auths -> ', err)
        }
    }

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const toggleNavs = (e, index) => {
        e.preventDefault();
        setActiveNav(index);
        setChartExample1Data("data" + index);
    };
    return (
        <>
            <Header showCards={true} repositoryCounts={repositoryCounts} contributorCounts={contributorCounts} refactoringCounts={refactoringCounts} />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="bg-gradient-default shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-light ls-1 mb-1">
                                            Overview
                                        </h6>
                                        <h2 className="text-white mb-0">Refactorings across Repositories</h2>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                <div className="chart">
                                    <Line
                                        data={refactoringChartDataFeed}
                                        options={chartExample1.options2}
                                        getDatasetAtEvent={(e) => console.log(e)}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                                            Trending Repositories
                                        </h6>
                                        <h2 className="mb-0">Total commits by Repository</h2>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                <div className="chart">
                                    <Bar
                                        data={commitByRepoDataFeed}
                                        options={chartExample2.options}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Page visits</h3>
                                    </div>
                                    <div className="col text-right">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            See all
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <></>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Page name</th>
                                        <th scope="col">Visitors</th>
                                        <th scope="col">Unique users</th>
                                        <th scope="col">Bounce rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">/argon/</th>
                                        <td>4,569</td>
                                        <td>340</td>
                                        <td>
                                            <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/index.html</th>
                                        <td>3,985</td>
                                        <td>319</td>
                                        <td>
                                            <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                            46,53%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/charts.html</th>
                                        <td>3,513</td>
                                        <td>294</td>
                                        <td>
                                            <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                            36,49%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/tables.html</th>
                                        <td>2,050</td>
                                        <td>147</td>
                                        <td>
                                            <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/profile.html</th>
                                        <td>1,795</td>
                                        <td>190</td>
                                        <td>
                                            <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                                            46,53%
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                    <Col xl="4">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Social traffic</h3>
                                    </div>
                                    <div className="col text-right">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            See all
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Referral</th>
                                        <th scope="col">Visitors</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Facebook</th>
                                        <td>1,480</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">60%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="60"
                                                        barClassName="bg-gradient-danger"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Facebook</th>
                                        <td>5,480</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">70%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="70"
                                                        barClassName="bg-gradient-success"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Google</th>
                                        <td>4,807</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">80%</span>
                                                <div>
                                                    <Progress max="100" value="80" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Instagram</th>
                                        <td>3,678</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">75%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="75"
                                                        barClassName="bg-gradient-info"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">twitter</th>
                                        <td>2,645</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">30%</span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="30"
                                                        barClassName="bg-gradient-warning"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;
