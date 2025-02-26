import React from "react";
import Plot from "react-plotly.js";

const BarChart = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-red-300 p-6 shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Rating Frequency</h2>
      <Plot 
        data={[
          {
            x: ["1", "2", "3", "4", "5"],
            y: [500, 7500, 2000, 3200, 6000],
            type: "bar",
            marker: {
              color: ["#76EEC6", "#CD853F", "#20B2AA", "#F4A460", "#2E8B57"], // Warna disesuaikan
            },
            width: 0.95,
          },
        ]}
        layout={{
          title: "",
          xaxis: {
            title: "Rating",
          },
          yaxis: {
            title: "",
          },
          showlegend: false,
          height: 400,
          width: 400,
        }}
        config={{
          displayModeBar: false, // Hilangkan button di kanan chart
          responsive: true, // Bikin chart responsive ke container
        }}
        style={{ width: "", height: "100%" }}
      />
    </div>
  );
};

export default BarChart;
