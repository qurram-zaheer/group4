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
  CardBody,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import axios from "axios";
import { api } from "../../lib/api";
import RepositoriesContext from "../../contexts/RepositoriesContext";
import { Line } from "react-chartjs-2";
import { chartExample1, chartExample2, chartOptions, parseOptions, } from "variables/charts.js";

const Commits = () => {

  const [commitsByBranch, setCommitsByBranch] = useState([]);
  const [repos, setRepos] = useContext(RepositoriesContext);
  const [difference, setDifference] = useState([]);
  const [createdOn, setCreatedOn] = useState([]);

  useEffect(() => {
    ; (async () => {
      console.log('repo', repos);

      const accessToken = await localStorage.getItem("token");
      await fetchCommitsByBranch(accessToken);
      await fetchCommitsFrequency(accessToken);
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
        console.log('fetchCommitsByBranchIns', data.data, myData, typeof(myData));
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

  var data = {
    labels: range(1, difference.length),
    datasets: [{
      label: "Difference in number of days between Commits",
      data: difference,
      borderColor: 'rgb(255, 255, 255)',
    }]
  };

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
                <h3 className="mb-0">Top commits by Branch</h3>
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
                    <h2 className="text-white mb-0">Commits Frequency</h2>
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

export default Commits;
