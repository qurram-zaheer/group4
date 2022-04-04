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

const Commits = () => {

  const [commitsByBranch, setCommitsByBranch] = useState([]);

  useEffect(() => {
    ; (async () => {
      await fetchCommitsByBranch();
    })()
  }, []);

  const fetchCommitsByBranch = async () => {
    const accessToken = await localStorage.getItem("token");
    const data = await api.getCommmitCountsByBranch({
      repository: 146 // TODO : Fetch from context
    }, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    if (data) {
      data.data.sort((a, b) => parseInt(b.commits) - parseInt(a.commits));
      setCommitsByBranch(data.data);
    }
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
                        // <tr key={index}>
                        //   <td>{listValue.id}</td>
                        //   <td>{listValue.title}</td>
                        //   <td>{listValue.price}</td>
                        // </tr>
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
      </Container>
    </>
  );
};

export default Commits;
