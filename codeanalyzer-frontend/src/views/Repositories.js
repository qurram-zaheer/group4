import React, { useContext, useEffect, useState } from "react";
import RepositoriesContext from "../contexts/RepositoriesContext";
import { BACKGROUND_COLORS, BORDER_COLORS } from "../COLORS.js";
import Pie from "components/Charts/Pie";
import {
  Card,
  Col,
  Container,
  Row,
  CardTitle,
  FormGroup,
  Input,
} from "reactstrap";
import { api } from "../lib/api";
import BarComponent from "components/Charts/BarComponent";
import LineComponent from "components/Charts/LineComponent";
import HorizontaBarComponent from "components/Charts/HorizontalBarComponent";

const Repositories = () => {
  const [repos, setRepos] = useContext(RepositoriesContext);
  const [langPieData, setLangPieData] = useState(null);
  const [contribDataTotal, setContribDataTotal] = useState(null);
  const [contribDataAdd, setContribDataAdd] = useState(null);
  const [contribDataDel, setContribDataDel] = useState(null);
  const [selectedContrib, setSelectedContrib] = useState("total");
  const [hourChartData, setHourChartData] = useState(null);
  const [userLangData, setUserLangData] = useState(null);
  const [selectedLangEffort, setSelectedLangEffort] = useState(null);

  const getUserLangData = async () => {
    if (repos.selectedRepo.attributes) {
      const repositoryId = repos.selectedRepo.id;
      const d = await api
        .getUserLanguageEffort(
          { repositoryId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.data);
      console.log("USER LANG DATA HERE WOWIEEEEE", d);
      if (d && Object.keys(d).length !== 0) {
        console.log("COMIONG IN HTEREEERE");
        setSelectedLangEffort(Object.keys(d)[0]);
        setUserLangData(d);
      }
    }
  };

  const getSelectedUserLangEffortData = () => {
    const obj = userLangData[selectedLangEffort];

    const labels = Object.keys(obj);
    const data = {
      labels,
      datasets: [
        {
          label: "Total Changes",
          data: Object.values(obj),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    return data;
  };

  const processLangData = async () => {
    if (repos.selectedRepo.attributes) {
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

  const commitHourData = async () => {
    console.log("OUT HERE");
    if (repos.selectedRepo.attributes) {
      console.log("asjdhaknsdbkjhqhIN HEEEREE");
      const repositoryId = repos.selectedRepo.id;
      const hourData = await api
        .getCommitCountPerHour(
          { repositoryId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.data);
      console.log("HOUUUUUR DATA", hourData);
      const labels = Object.keys(hourData);
      const chartData = {
        labels,
        datasets: [
          {
            label: "# of Commits",
            data: Object.values(hourData),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };
      setHourChartData(chartData);
    }
  };

  const selectBarData = () => {
    console.log(selectedContrib);
    if (selectedContrib === "total") return contribDataTotal;
    else if (selectedContrib === "add") return contribDataAdd;
    else if (selectedContrib === "del") return contribDataDel;
  };

  const processContribData = async () => {
    const selRep = repos.selectedRepo;
    const repoId = repos.selectedRepo.id;
    console.log("OUTERSELREP", selRep);
    if (repos.selectedRepo.attributes) {
      let totalArr = [];
      let addArr = [];
      let delArr = [];
      console.log("kjasdkljasjdasd", repos.selectedRepo.id);
      const contribData = await api
        .getContributorsForRepo(
          { repoId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.data)
        .then((res) => res.data);
      let labels = [];
      contribData?.map((entry) => {
        addArr.push(entry.attributes.sumadditions);
        delArr.push(entry.attributes.sumdeletions);
        totalArr.push(entry.attributes.sumchanges);
        labels.push(entry.attributes.name);
      });
      const addObj = {
        labels,
        datasets: [
          {
            label: "LOC",
            data: addArr,
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };
      const delObj = {
        labels,
        datasets: [
          {
            label: "LOC",
            data: delArr,
            backgroundColor: "rgba(255, 206, 86, 0.2)",
          },
        ],
      };
      const totalObj = {
        labels,
        datasets: [
          {
            label: "LOC",
            data: totalArr,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
          },
        ],
      };
      await setContribDataAdd(addObj);
      await setContribDataDel(delObj);
      await setContribDataTotal(totalObj);
    }
  };

  useEffect(() => {
    processLangData();
    processContribData();
    commitHourData();
    getUserLangData();
  }, [repos]);

  return (
    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
      {console.log(repos)}
      <Container fluid>
        <div className="header-body">
          <Row style={{ marginBottom: "20px" }}>
            <Col>
              <Card
                className="card-stats mb-4 mb-xl-0"
                style={{
                  height: "400px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: userLangData ? "space-between" : "start",
                  width: "100%",
                  padding: "20px",
                }}
              >
                <CardTitle
                  tag="h5"
                  className="text-uppercase text-muted mb-2 ml-3"
                  style={{ marginTop: 0 }}
                >
                  Language-wise contribution
                </CardTitle>
                <FormGroup>
                  {/* <Label for="exampleSelect">Select</Label> */}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={(e) => setSelectedLangEffort(e.target.value)}
                  >
                    {userLangData ? (
                      <>
                        {console.log(
                          "WHY AM I NULL BRO WHAT BRO",
                          userLangData
                        )}
                        {Object.keys(userLangData).map((lang) => (
                          <option value={lang} key={lang}>
                            {lang}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option>Loading</option>
                    )}
                  </Input>
                </FormGroup>
                {userLangData ? (
                  <HorizontaBarComponent data={getSelectedUserLangEffortData} />
                ) : null}
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card
                className="card-stats mb-4 mb-xl-0"
                style={{
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  width: "60%",
                }}
              >
                <CardTitle
                  tag="h5"
                  className="text-uppercase text-muted mb-2 ml-3"
                  style={{ marginTop: 0 }}
                >
                  Share of Languages
                </CardTitle>
                {langPieData ? <Pie data={langPieData} /> : null}
              </Card>
            </Col>

            <Col>
              <Card
                className="card-stats mb-4 mb-xl-0"
                style={{
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  width: "100%",
                  padding: "20px",
                }}
              >
                <CardTitle
                  tag="h5"
                  className="text-uppercase text-muted mb-2 ml-3"
                >
                  Most productive hours
                </CardTitle>
                {hourChartData ? <LineComponent data={hourChartData} /> : null}
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <Card
                className="card-stats mb-4 mb-xl-0 p-2"
                style={{
                  height: "450px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                <CardTitle
                  tag="h5"
                  className="text-uppercase text-muted mb-2 ml-3"
                >
                  Top contributors
                </CardTitle>

                <FormGroup>
                  {/* <Label for="exampleSelect">Select</Label> */}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={(e) => setSelectedContrib(e.target.value)}
                  >
                    <option
                      onChange={() => setSelectedContrib("total")}
                      value="total"
                    >
                      Total Changes
                    </option>
                    <option
                      onChange={() => setSelectedContrib("add")}
                      value="add"
                    >
                      Additions
                    </option>
                    <option
                      onChange={() => setSelectedContrib("del")}
                      value="del"
                    >
                      Deletions
                    </option>
                  </Input>
                </FormGroup>

                {contribDataTotal ? (
                  <BarComponent data={selectBarData()} />
                ) : null}
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Repositories;
