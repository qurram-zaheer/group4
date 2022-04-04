import React, { useContext, useEffect, useState } from "react";
import RepositoriesContext from "../contexts/RepositoriesContext";
import { BACKGROUND_COLORS, BORDER_COLORS } from "../COLORS.js";
import Pie from "components/Charts/Pie";
import { Card, CardBody, Col, Container, Row, CardTitle } from "reactstrap";

const Repositories = () => {
  const [repos, setRepos] = useContext(RepositoriesContext);
  const [langPieData, setLangPieData] = useState(null);

  const processLangData = async () => {
    if (repos.selectedRepo.attributes) {
      console.log("in here33");
      const languageObj = repos.selectedRepo.attributes.languages;
      console.log(languageObj);
      const labels = Object.keys(languageObj);
      const vals = Object.values(languageObj);
      const data = {
        labels,
        datasets: [
          {
            label: "Share of language in repository",
            data: vals,
            backgroundColor: BACKGROUND_COLORS,
            borderColor: BORDER_COLORS,
            borderWidth: 1,
          },
        ],
      };
      await setLangPieData(data);
    }
  };

  useEffect(() => {
    processLangData();
  }, [repos]);

  return (
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      {console.log(repos)}
      <Container fluid>
        <div className="header-body">
          <Row>
            <Col>
              <Card
                className="card-stats mb-4 mb-xl-0"
                style={{
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  width: "60%",
                }}
              >
                <CardTitle
                  tag="h5"
                  className="text-uppercase text-muted mb-2 ml-3"
                >
                  Share of Languages
                </CardTitle>
                {langPieData ? <Pie data={langPieData} /> : null}
              </Card>
            </Col>

            <Col lg="6" xl="3">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  <Row>
                    <div className="col">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted mb-0"
                      >
                        Performance
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">49,65%</span>
                    </div>
                    <Col className="col-auto">
                      <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                        <i className="fas fa-percent" />
                      </div>
                    </Col>
                  </Row>
                  <p className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-success mr-2">
                      <i className="fas fa-arrow-up" /> 12%
                    </span>{" "}
                    <span className="text-nowrap">Since last month</span>
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Repositories;
