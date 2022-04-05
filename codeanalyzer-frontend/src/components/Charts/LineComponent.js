import React from "react";
import { Line } from "react-chartjs-2";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const LineComponent = (props) => {
  return (
    <Line
      options={{ ...options, maintainAspectRatio: false }}
      data={props.data}
    />
  );
};

export default LineComponent;
