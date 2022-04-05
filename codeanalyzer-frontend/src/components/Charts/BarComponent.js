import React from "react";
import { Bar } from "react-chartjs-2";

const BarComponent = (props) => {
  const options = {
    legend: {
      display: true,
      position: "right",
    },
  };
  return (
    <div>
      {console.log("bar props", props.data)}
      <Bar
        data={props.data}
        options={{ ...options, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default BarComponent;
