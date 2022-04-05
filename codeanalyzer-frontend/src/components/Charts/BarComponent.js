import React from "react";
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
