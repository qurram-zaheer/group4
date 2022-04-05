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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useContext, useState } from "react";
import JiraContext from "contexts/JiraContext";


const Profile = () => {
  const [jiraAuth, setJiraAuth] = useContext(JiraContext);
  const [gitConnectStatus, setGitConnectionStatus] = useState(true);
  const [jiraConectStatus, setJiraConnectionStatus] = useState(false);

  const handleConnection = (data) => {
    console.log('data', data);
    if (data.type == 'jira') {
      //handleJiraConnection()
      setJiraConnectionStatus(!jiraConectStatus)
    } else if (data.type == 'git') {
      //handleGitConnection()
      setGitConnectionStatus(!gitConnectStatus)
    }
  }

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Integrations</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      THIRD PARTY
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <h6 className="heading-small text-muted mb-4">
                  User integration information
                </h6>
                <Row>
                  <Col xl="8 text-center">
                    <h3>
                      Github
                    </h3>
                  </Col>
                  <Col xl="4 text-center">
                    {gitConnectStatus ?
                      <Button className="btn-icon btn-3" color="primary" type="button" onClick={() => handleConnection({ type: 'git' })}>
                        <span className="btn-inner--icon">
                          <i className="ni ni-check-bold" />
                        </span>
                        <span className="btn-inner--text">Added</span>
                      </Button> :
                      <Button className="btn-icon btn-3" color="primary" type="button" onClick={() => handleConnection({ type: 'git' })}>
                        <span className="btn-inner--icon">
                          <i className="ni ni-fat-add" />
                        </span>
                        <span className="btn-inner--text">Connect</span>
                      </Button>
                    }
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col xl="8 text-center">
                    <h3>
                      Jira
                    </h3>
                  </Col>
                  <Col xl="4 text-center">
                    {jiraConectStatus ?
                      <Button className="btn-icon btn-3" color="primary" type="button" onClick={() => handleConnection({ type: 'jira' })}>
                        <span className="btn-inner--icon">
                          <i className="ni ni-check-bold" />
                        </span>
                        <span className="btn-inner--text">Added</span>
                      </Button> :
                      <Button className="btn-icon btn-3" color="primary" type="button" onClick={() => handleConnection({ type: 'jira' })}>
                        <span className="btn-inner--icon">
                          <i className="ni ni-fat-add" />
                        </span>
                        <span className="btn-inner--text">Connect</span>
                      </Button>
                    }
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
