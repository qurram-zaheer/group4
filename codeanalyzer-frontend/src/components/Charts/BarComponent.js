import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const BarComponent = (props) => {
  const options = {
    legend: {
      display: false,
    },
  };
  return (
    <div style={{ height: "90%" }}>
      {console.log("bar props", props.data)}
      <Bar
        data={props.data}
        width={"50%"}
        options={{ ...options, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default BarComponent;
