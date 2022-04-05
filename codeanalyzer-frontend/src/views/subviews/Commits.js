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
// reactstrap components
import moment from 'moment';
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
  Col,
  CardBody,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
import { api } from "../../lib/api";
import RepositoriesContext from "../../contexts/RepositoriesContext";
import { Line, Bar } from "react-chartjs-2";
import { chartExample1, chartExample2, chartOptions, parseOptions, } from "variables/charts.js";
const qs = require('qs');

const Commits = () => {

  const [commitsByBranch, setCommitsByBranch] = useState([]);
  const [repos, setRepos] = useContext(RepositoriesContext);
  const [difference, setDifference] = useState([]);
  const [commitsChartData, setCommitsChartData] = useState([]);
  const [createdOn, setCreatedOn] = useState([]);

  useEffect(() => {
    ; (async () => {
      console.log('repo', repos);
      const accessToken = await localStorage.getItem("token");
      await fetchCommitsByBranch(accessToken);
      await fetchCommitsFrequency(accessToken);
      await fetchCommitsAcrossBranchByDay(accessToken);
    })()
  }, [repos]);

  const fetchCommitsByBranch = async (accessToken) => {
    console.log('selectedRepoId', repos.selectedRepo.id);
    const data = await api.getCommmitCountsByBranch({
      repository: repos?.selectedRepo?.id
    }, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    if (data) {
      console.log('fetchCommitsByBranch', data.data.length);
      if (data.data?.length > 0 && Array.isArray(data.data)) {
        const myData = data.data;
        console.log('fetchCommitsByBranchIns', data.data, myData, typeof (myData));
        myData.sort((a, b) => parseInt(b.commits) - parseInt(a.commits));
        setCommitsByBranch(myData);
      }
    }
  }

  const fetchCommitsFrequency = async (accessToken) => {
    const data = await api.getCommitsFrequencyByRepository({
      repository: repos?.selectedRepo?.id
    }, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    setCreatedOn(data.data.createdOn);
    const differenceRoundArray = data.data.difference.map(function (each_element) {
      return Number(each_element.toFixed(2));
    });
    differenceRoundArray.shift();
    setDifference(differenceRoundArray);
    console.log('data', difference, createdOn);
  }

  const range = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

  const fetchCommitsAcrossBranchByDay = async (accessToken) => {
    const query = qs.stringify({
      fields: ['branch', 'commitdate', 'commit_id'],
    }, {
      encodeValuesOnly: true,
    });
    const data = await api.getCommitsQuery({
      repositoryId: repos?.selectedRepo?.id,
      query: query
    }, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    if (data) {
      var result = {};
      if (data.data?.data?.length > 0 && Array.isArray(data.data?.data)) {
        data.data.data.map((commit) => {
          if (result[commit.attributes?.commitdate.slice(0, 10)] == null || result[commit.attributes?.commitdate.slice(0, 10)] == undefined) {
            result[commit.attributes?.commitdate.slice(0, 10)] = 0
          } else {
            result[commit.attributes?.commitdate.slice(0, 10)] = result[commit.attributes?.commitdate.slice(0, 10)] + 1;
          }
        })
      }
      const orderedDates = {};
      Object.keys(result).sort(function(a, b) {
        return moment(b, 'YYYY-MM-DD').toDate() - moment(a, 'YYYY-MM-DD').toDate();
    }).forEach(function(key) {
        orderedDates[key] = result[key];
    })
      console.log('Commits Chart Data -> ', result, orderedDates);
      setCommitsChartData(orderedDates);
    }
  }

  var data = {
    labels: range(1, difference.length),
    datasets: [{
      label: "Difference in number of days between Commits",
      data: difference,
      borderColor: 'rgb(255, 255, 255)',
    }]
  };

  var commitByDayDataFeed = {
    labels: Object.keys(commitsChartData),
    datasets: [
      {
        label: "Commits By Repo",
        data: Object.values(commitsChartData),
      },
    ],
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Top Branches Based on Commits</h3>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Branch Name</th>
                      <th scope="col">Commits</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    {commitsByBranch.map((commitByBranch, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            <span className="mb-0 text-sm">
                              {commitByBranch.branch}
                            </span>
                          </th>
                          <td>{commitByBranch.commits}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
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
                    <h2 className="text-white mb-0">Time Take Between Each Commits</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <Line
                  data={data}
                  options={chartExample1.options3}
                  getDatasetAtEvent={(e) => console.log(e)}
                  height={150}
                />
              </CardBody>
            </Card>
          </div>
        </Row>
        <Row className="mt-5">
          <Col>
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Commits Pushed Across Branches Per Day
                    </h6>
                    <h2 className="mb-0">Total commits by Day</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <Bar
                  data={commitByDayDataFeed}
                  options={chartExample2.options3}
                  height={150}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Commits;
