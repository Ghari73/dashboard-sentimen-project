import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const PieChart = () => {
  const [sentimentData, setSentimentData] = useState({ positive: 0, negative: 0 });

  useEffect(() => {
    // Fetch data dari file JSON di public folder
    fetch("/data/dummy_timeseries.json")
      .then((response) => response.json())
      .then((data) => {
        // Hitung total sentiment_count untuk negatif (0) dan positif (1)
        const sentimentCounts = data.reduce(
          (acc, item) => {
            if (item.sentiment === 0) {
              acc.negative += item.sentiment_count;
            } else if (item.sentiment === 1) {
              acc.positive += item.sentiment_count;
            }
            return acc;
          },
          { positive: 0, negative: 0 }
        );

        setSentimentData(sentimentCounts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Sentiment Distribution</h2>
      <Plot
        data={[
          {
            values: [sentimentData.negative, sentimentData.positive],
            labels: ["Negative", "Positive"],
            type: "pie",
            marker: {
              colors: ["#FF6384", "#36A2EB"], // Warna untuk negatif & positif
            },
          },
        ]}
        layout={{
          title: "Sentiment Analysis",
          height: 400,
          width: 500,
          responsive: true,
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default PieChart;
