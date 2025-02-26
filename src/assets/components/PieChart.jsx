import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data/dummy_timeseries.json") // Pastikan path benar
      .then((response) => response.json())
      .then((jsonData) => {
        // Hitung total sentiment negatif & positif
        const totalNegative = jsonData
          .filter((item) => item.sentiment === 0)
          .reduce((sum, item) => sum + item.sentiment_count, 0);

        const totalPositive = jsonData
          .filter((item) => item.sentiment === 1)
          .reduce((sum, item) => sum + item.sentiment_count, 0);

        // Buat data Pie Chart dengan styling kustom
        const pieData = [
          {
            values: [totalNegative, totalPositive],
            labels: ["Negative Sentiment", "Positive Sentiment"],
            type: "pie",
            hole: 0.5, // Ukuran lubang tengah (donut)
            textinfo: "label+percent", // Menampilkan label + persen
            hoverinfo: "label+percent+value", // Informasi saat hover
            // pull: [0.05, 0], // Menonjolkan bagian Negative Sentiment
            marker: {
              colors: ["#FF4D4D", "#4CAF50"], // Warna custom
              line: {
                color: "#ffffff", // Warna border antar slice
                width: 2.5,
              },
            },
            textfont: {
              family: "Arial, sans-serif",
              size: 16,
              color: "#ffffff", // Warna teks dalam chart
            },
          },
        ];

        setData(pieData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-white p-6 shadow-md rounded-md w-full">
      <Plot
        data={data}
        layout={{
          title: {
            text: "Sentiment Analysis Distribution",
            font: { family: "Arial, sans-serif", size: 24, color: "#333" },
          },
          height: "100%",
          width: "fit-content",
          showlegend: true,
          legend: {
            font: { size: 14, color: "#555" },
            orientation: "", // Letak legend horizontal
            x: 0.3,
            y: -0.2,
          },
          annotations: [
            {
              text: "Sentiment",
              font: { size: 22, color: "#444" },
              showarrow: false,
              x: 0.5,
              y: 0.5,
            },
          ],
          paper_bgcolor: "#f2f2f2", // Background chart
          plot_bgcolor: "#ffffff", // Background area dalam chart
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default PieChart;
