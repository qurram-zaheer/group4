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

const PullRequests = () => {


  const [activeNav, setActiveNav] = useState(1);
  const [difference, setDifference] = useState([]);
  const [createdOn, setCreatedOn] = useState([]);
  const [contributor, setContributor] = useState('');
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const generatePullRequestsFrequencyPerUser = async (e) => {
    const accessToken = await localStorage.getItem("githubToken");
    const strapiToken = await localStorage.getItem("token");
    const data = await api.getPullRequestFrequencyPerUser({
      contributor: contributor,
      accessToken: accessToken
    }, {
      headers: {
        'Authorization': 'Bearer ' + strapiToken
      }
    });
    setCreatedOn(data.data.createdOn);
    setDifference(data.data.difference);
    e.preventDefault();
  }
  
  var data = {
    labels: createdOn,
    datasets: [{
      label: "Difference in number of days between PRs",
      data: difference,
    }]
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Pull Requests
                    </h6>
                    <h2 className="text-white mb-0">Pull Requests Frequency By User For A Repository</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="input-group mb-4">
                          <input className="form-control" placeholder="Enter a developer name" type="text" onChange={e => setContributor(e.target.value)} value={contributor} />
                        </div>
                        <Button color="primary" type="submit" onClick={e => { generatePullRequestsFrequencyPerUser(e) }}>
                          Submit
                        </Button>
                      </div>
                    </div>
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

export default PullRequests;
