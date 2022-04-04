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
import { useState, useEffect } from "react";
// react component that copies the given text inside your clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// React Components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  NavItem,
  CardBody,
  Nav,
  NavLink,
  Button,
  Col,
  Alert,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// core components
import { chartExample1, chartExample2, chartOptions, parseOptions, } from "variables/charts.js";

import { api } from "../../lib/api"
// react plugin used to create charts
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

const PullRequestsRepo = () => {

  const [difference, setDifference] = useState([]);
  const [createdOn, setCreatedOn] = useState([]);
  const [contributor, setContributor] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [chosenRepo, setChosenRepo] = useState('');
  const [chosenPR, setChosenPR] = useState('');
  const [userNotFound, setUserNotFound] = useState(false);
  const [loadedRepos, setLoadedRepos] = useState(false);
  const [prs, setPRS] = useState([]);

  useEffect(() => {
    ; (async () => {
      const strapiToken = await localStorage.getItem("token");
      const repos = await api.getRepositories({
        headers: {
          'Authorization': 'Bearer ' + strapiToken
        }
      });
      if (repos.data) {
        setRepositories(repos.data.data);
        setChosenRepo(repos.data.data[0].attributes.name);
        setLoadedRepos(true);
        loadPullRequestUsers(repos.data.data[0].attributes.name);
      }
    })()
  }, []);

  const loadPullRequestUsers = async (repo) => {
      const accessToken = await localStorage.getItem("githubToken");
      const strapiToken = await localStorage.getItem("token");
      const pullRequests = await api.getPullRequestsUniqueUsers({
        repository: repo,
        accessToken: accessToken,
      } ,{
        headers: {
          'Authorization': 'Bearer ' + strapiToken
        }
      });
      console.log(pullRequests);
      if(pullRequests){
        setPRS(pullRequests.data.contributors);
        setChosenPR(pullRequests.data.contributors[0])
      }
  }

  const generatePullRequestsFrequencyPerUser = async (e) => {
    const accessToken = await localStorage.getItem("githubToken");
    const strapiToken = await localStorage.getItem("token");
    console.log('chosenPR', chosenPR);
    const data = await api.getPullRequestFrequencyPerUser({
      contributor: chosenPR,
      accessToken: accessToken,
      repository: repositories
    }, {
      headers: {
        'Authorization': 'Bearer ' + strapiToken
      }
    });
    if ((data.data.createdOn.length <= 0) || (data.data.difference.length <= 0)) {
      setUserNotFound(true);
    } else {
      setUserNotFound(false);
    }
    setCreatedOn(data.data.createdOn);
    const differenceRoundArray =  data.data.difference.map(function(each_element){
      return Number(each_element.toFixed(2));
    });
    setDifference(differenceRoundArray);
    e.preventDefault();
  }

  var data = {
    labels: createdOn,
    datasets: [{
      label: "Difference in number of days between PRs",
      data: difference,
      borderColor: 'rgb(255, 255, 255)',
    }]
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col>
          <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                                            Performance
                                        </h6>
                                        <h2 className="mb-0">Total orders</h2>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                <div className="chart">
                                    <Bar
                                        data={chartExample2.data}
                                        options={chartExample2.options}
                                    />
                                </div>
                            </CardBody>
                        </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Pull Requests Frequency</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={data}
                    options={chartExample1.options}
                    height={100}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default PullRequestsRepo;
