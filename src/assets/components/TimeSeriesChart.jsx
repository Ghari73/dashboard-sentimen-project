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
          name: "Negative Sentiment",
          x: negativeSentiment.map((item) => formatDate(item.review_date)),
          y: negativeSentiment.map((item) => item.sentiment_count),
          line: { color: "#FF5733" },
        };

        // Data untuk sentiment positif
        const trace2 = {
          type: "scatter",
          mode: "lines+markers",
          name: "Positive Sentiment",
          x: positiveSentiment.map((item) => formatDate(item.review_date)),
          y: positiveSentiment.map((item) => item.sentiment_count),
          line: { color: "#33FF57" },
        };

        setData([trace1, trace2]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-white p-6 shadow-md rounded-md flex">
      <Plot
        data={data}
        layout={{
    title: "Sentiment Analysis Over Time",
    xaxis: { 
      title: "Date",
      tickformat: "%Y-%m-%d" // Hanya tampilkan tanggal
    },
    yaxis: { title: "Sentiment Count" }
  }}
  style={{ width: "100%", height: "100%" }}
/>

    </div>
  );
};

export default TimeSeriesChart;
