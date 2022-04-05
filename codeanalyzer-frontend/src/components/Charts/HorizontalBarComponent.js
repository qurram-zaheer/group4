import React from "react";
import { Bar } from "react-chartjs-2";

const HorizontaBarComponent = (props) => {
  const options = {
    indexAxis: "y",
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div style={{ height: "90%" }}>
      {console.log("bar props", props.data)}
      <Bar
        data={props.data}
        options={{ ...options, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default HorizontaBarComponent;
