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
import HeaderFileModifications from "components/Headers/HeaderFileModifications";

const FileModifications = () => {
    const [committedFiles, setCommittedFiles] = useState([]);
    const [loadedCommittedFiles, setLoadedCommittedFiles] = useState(false);
    const [dataByMonth, setDataByMonth] = useState({});
  
    const userId = localStorage.getItem("strapiUserId");

    useEffect(() => {
        ; (async () => {
          const strapiToken = await localStorage.getItem("token");
          const commFiles = await api.getCommitedFiles({
            headers: {
              'Authorization': 'Bearer ' + strapiToken
            }
          });
          
          if (commFiles.data) {
            setCommittedFiles(commFiles.data.data);
            setLoadedCommittedFiles(true);
            console.log(commFiles.data.data)
            await generateChartData(commFiles.data.data);
            // Data model down so using random values
            // Array.apply(null, {length: 12}).map(x=>Math.floor(Math.random()*5))
            //setDataByMonth({"addition":[1,0,3,5,2,1,1,3,4,2,4,1], "modification":[3,1,4,2,5,3,2,6,2,1,5,1], "deletion":[2,1,0,3,4,1,5,1,3,2,1,4]})
          }
        })()
      }, []);

      const generateChartData = (data) => {
        console.log('entered with data', data)
        const addCountByMonth = [0,0,0,0,0,0,0,0,0,0,0,0]
        const deleteCountByMonth = [0,0,0,0,0,0,0,0,0,0,0,0]
        const modificationsCountByMonth = [0,0,0,0,0,0,0,0,0,0,0,0]

        for(const committedFile of data){
          console.log("teadsa", committedFile, new Date(committedFile.attributes.commitdate))
          if(committedFile.attributes.status === "added" ){
            addCountByMonth[new Date(committedFile.attributes.commitdate).getMonth()]++;
          }else if(committedFile.attributes.status === "removed" ){
            deleteCountByMonth[new Date(committedFile.attributes.commitdate).getMonth()]++;
          }else if(committedFile.attributes.status === "modified" ){
            modificationsCountByMonth[new Date(committedFile.attributes.commitdate).getMonth()]++;
          }
        }
        setDataByMonth({"addition":addCountByMonth, "modification":modificationsCountByMonth, "deletion":deleteCountByMonth});
      }
    
      var data = {
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", ],
        datasets: [{
          label: "Aditions ",
          data: dataByMonth.addition,
          borderColor: 'rgb(42, 157, 143)',
        },
        {
          label: "Modifications ",
          data: dataByMonth.modification,
          borderColor: 'rgb(233, 196, 106)',
        },
        {
          label: "Deletions ",
          data: dataByMonth.deletion,
          borderColor: 'rgb(231, 111, 81)',
        }]
      };

      const addData = dataByMonth.addition;
      const modData = dataByMonth.modification;
      const delData = dataByMonth.deletion;

      return (
        <>
          <HeaderFileModifications 
              showCards="true"
              additionCounts={addData? addData.reduce((a,b) => a+b,0): 14}
              modificationCounts={modData? modData.reduce((a,b) => a+b,0): 10}
              removedCounts={delData? delData.reduce((a,b) => a+b,0): 1}
          >
          </HeaderFileModifications>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row className="mt-5">
              <div className="col">
                <Card className="bg-gradient-default shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h2 className="text-white mb-0">File Changes In The Past Year</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Line
                        data={data}
                        options={chartExample1.options4}
                        height={100}
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
    
export default FileModifications;
    