import React from "react";
import Plot from "react-plotly.js";

const LineChart = () => {
  return (
    <Plot
      data={[
        {
          x: [1, 2, 3, 4, 5],
          y: [10, 15, 7, 12, 20],
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "blue" },
        },
      ]}
      layout={{ title: "Sentiment Frekuensi Over Time" }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default LineChart;
