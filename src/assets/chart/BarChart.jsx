import React from "react";
import Plot from "react-plotly.js";

const BarChart = () => {
  return (
    <Plot
      data={[
        {
          type: "bar",
          x: [1, 2, 3, 4, 5],
          y: [5, 10, 2, 8, 12],
          marker: {
            color: "#C8A2C8",
            line: {
              width: 2.5,
            },
          },
        },
      ]}
      layout={{
        title: "Responsive to window's size!",
        font: { size: 18 },
      }}
      config={{ responsive: true }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default BarChart;
