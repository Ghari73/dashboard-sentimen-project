import React from "react";
import Plot from "react-plotly.js";

const BarNegatif = () => {
  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Grouped Bar Chart</h2>
      <Plot
        data={[
          {
            x: ["giraffes", "orangutans", "monkeys"],
            y: [20, 14, 23],
            name: "SF Zoo",
            type: "bar",
            marker: { color: "#36A2EB" },
          },
          {
            x: ["giraffes", "orangutans", "monkeys"],
            y: [12, 18, 29],
            name: "LA Zoo",
            type: "bar",
            marker: { color: "#FF6384" },
          },
        ]}
        layout={{
          barmode: "group",
          title: "Zoo Animal Count Comparison",
          xaxis: { title: "Animal Type" },
          yaxis: { title: "Count" },
          height: 400,
          width: 600,
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default BarNegatif;
