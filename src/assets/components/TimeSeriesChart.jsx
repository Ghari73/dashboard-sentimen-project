import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const TimeSeriesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/data/dummy_timeseries.json") // Ambil data dari public folder
      .then((response) => response.json())
      .then((jsonData) => {
        // Pisahkan data berdasarkan sentiment (0 = negatif, 1 = positif)
        const negativeSentiment = jsonData.filter((item) => item.sentiment === 0);
        const positiveSentiment = jsonData.filter((item) => item.sentiment === 1);

        // Format tanggal agar lebih mudah dibaca
        const formatDate = (dateString) => {
          const date = new Date(dateString);
          return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        };

        // Data untuk sentiment negatif
        const trace1 = {
          type: "scatter",
          mode: "lines+markers",
          name: "Negative",
          x: negativeSentiment.map((item) => formatDate(item.review_date)),
          y: negativeSentiment.map((item) => item.sentiment_count),
          line: { color: "#FF7F0E" }, // Warna lebih lembut
          marker: { size: 6 },
        };

        // Data untuk sentiment positif
        const trace2 = {
          type: "scatter",
          mode: "lines+markers",
          name: "Positive",
          x: positiveSentiment.map((item) => formatDate(item.review_date)),
          y: positiveSentiment.map((item) => item.sentiment_count),
          line: { color: "#1F77B4" }, // Warna biru profesional
          marker: { size: 6 },
        };

        setData([trace1, trace2]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Plot
      data={data}
      layout={{
        xaxis: {
          title: "Date",
          tickformat: "%Y-%m-%d",
          showgrid: true,
        },
        height: 800,
        yaxis: { title: "Sentiment Count", showgrid: true },
        paper_bgcolor: "white", 
        margin: { l: 40, r: 10, t: 30, b: 30 },
        showlegend: true,
        legend: {
          x: 0.5, 
          y: -0.05, 
          xanchor: "center",
          yanchor: "top",
          orientation: "h"
        }
        }}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: "100%"}}
        
    />
  );
};

export default TimeSeriesChart;
