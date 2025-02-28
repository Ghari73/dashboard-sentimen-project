import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { fetchAllSentiment } from "../../api/restApi";


const TimeSeriesChart = ({ fromDate, toDate }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revision, setRevision] = useState(false);

  useEffect(() => {
    const getData = async () => {
      console.log("🔄 Fetching sentiment time series data...", { fromDate, toDate });

      try {
        const result = await fetchAllSentiment(fromDate, toDate);
        console.log("📊 Raw API Response:", result);

        // Pisahkan data berdasarkan sentiment (0 = negatif, 1 = positif)
        setRevision(true);
        const negativeSentiment = result.filter((item) => item.sentiment === "0");
        const positiveSentiment = result.filter((item) => item.sentiment === "1");

        // Data untuk sentiment negatif
        const trace1 = {
          type: "scatter",
          mode: "lines+markers",
          name: "Negative",
          x: negativeSentiment.map((item) => item.reviewDate),
          y: negativeSentiment.map((item) => item.sentimentCount),
          line: { color: "#FF7F0E" }, // Warna lebih lembut
          marker: { size: 6 },
        };

        // Data untuk sentiment positif
        const trace2 = {
          type: "scatter",
          mode: "lines+markers",
          name: "Positive",
          x: positiveSentiment.map((item) => item.reviewDate),
          y: positiveSentiment.map((item) => item.sentimentCount),
          line: { color: "#1F77B4" }, // Warna biru profesional
          marker: { size: 6 },
        };

        setData([ {...trace1}, {...trace2} ]);
        setRevision(prev => !prev);
        console.log("✅ Processed Data:", { trace1, trace2 });

      } catch (err) {
        console.error("❌ Error in getData:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log("📉 Data fetching process finished.");
      }
    };

    getData();
  }, [fromDate, toDate]);

  return (
    <Plot
      key={revision}
      data={data}
      layout={{
        xaxis: {
          title: "Date",
          tickformat: "%b %d %Y",
          tickformat: "%b %d %Y",
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
