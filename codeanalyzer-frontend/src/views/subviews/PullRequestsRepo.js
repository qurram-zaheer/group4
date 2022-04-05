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
import { useState, useEffect, useContext } from "react";
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
import RepositoriesContext from "../../contexts/RepositoriesContext";
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
  const [repos, setRepos] = useContext(RepositoriesContext);
  const [prsByBranch, setPRSByBranch] = useState([]);

  useEffect(() => {
    ; (async () => {
      const accessToken = await localStorage.getItem("githubToken");
      const strapiToken = await localStorage.getItem("token");
      if (repos != null) {
        console.log('repos', repos)
        generatePullRequestsFrequencyByBranch(accessToken, strapiToken);
      }
    })()
  }, [repos]);

  const generatePullRequestsFrequencyByBranch = async (accessToken, strapiToken) => {
    const data = await api.getPullRequestsCountsByBranch({
      accessToken: accessToken,
      repository: repos?.selectedRepo?.id
    }, {
      headers: {
        'Authorization': 'Bearer ' + strapiToken
      }
    });
    if (data) {
      console.log('PullRequestRepodata', data);
      if (data.data?.length > 0 && Array.isArray(data.data)) {
        const myData = data.data;
        myData.sort((a, b) => parseInt(b.prs) - parseInt(a.prs));
        await setPRSByBranch(myData);
      }
    }
  }

  var commitByRepoDataFeed = {
    labels: prsByBranch.map(function (item) {
      return item.branch;
    }),
      datasets: [{
        label: "Commits By Repo",
        data: prsByBranch.map(function (item) {
          return item.prs;
        }),
      }]
  }

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
                      Pull Requests
                    </h6>
                    <h2 className="mb-0">Pull Requests By Branches</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Bar
                    data={commitByRepoDataFeed}
                    options={chartExample2.options}
                    height={100}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PullRequestsRepo;
