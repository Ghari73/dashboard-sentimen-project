import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data/dummy_timeseries.json") // Pastikan path benar
      .then((response) => response.json())
      .then((jsonData) => {
        const totalNegative = jsonData
          .filter((item) => item.sentiment === 0)
          .reduce((sum, item) => sum + item.sentiment_count, 0);

        const totalPositive = jsonData
          .filter((item) => item.sentiment === 1)
          .reduce((sum, item) => sum + item.sentiment_count, 0);

        const pieData = [
          {
            values: [totalPositive, totalNegative],
            labels: ["Positive", "Negative"],
            type: "pie",
            hole: 0.4,
            textinfo: "percent",
            hoverinfo: "label+percent+value",
            marker: {
              colors: ["#22C3E6", "#E69F22"],
              line: { color: "#ffffff", width: 2 },
            },
          },
        ];

        setData(pieData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-white p-6 shadow-md rounded-md w-full flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4 self-start text-[#13A09B]">Sentiment Distribution</h2>
      <div className="w-full flex justify-center">
        <Plot
          data={data}
          layout={{
            height: 350,
            width: 400, // Ubah width agar tidak keluar dari kontainer
            showlegend: true,
            legend: {
              x: 1,
              y: 0.5,
              font: { size: 14, color: "#333" },
            },
            
            margin: { l: 20, r: 20, t: 20, b: 20 }, // Atur margin supaya tidak keluar kontainer
          }}
          style={{ width: "100%", height: "auto" }}

          config={{
            displayModeBar: false,
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
