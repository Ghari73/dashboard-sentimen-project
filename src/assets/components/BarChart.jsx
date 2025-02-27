import React from "react";
import Plot from "react-plotly.js";

const BarChart = () => {
  return (
    <div className="w-full mx-auto bg-white p-4 shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-2 text-[#13A09B]">Rating Frequency</h2>
      <div className="w-full h-[360px] bg-white p-2 rounded-md">
        <Plot
          data={[
            {
              x: ["1", "2", "3", "4", "5"],
              y: [500, 7500, 2000, 3200, 6000],
              type: "bar",
              marker: {
                color: ["#7CE1E6", "#B4782D", "#5A908D", "#E6B877", "#2D7068"],
              },
              width: 0.95, // Lebar batang diperbaiki agar sesuai
              name: "Rating",
            },
          ]}
          layout={{
            xaxis: {
              title: "Rating",
              tickmode: "array",
              tickvals: [1, 2, 3, 4, 5], // Memastikan semua angka rating muncul
              ticktext: ["1", "2", "3", "4", "5"],
              showgrid: false, // Hilangkan garis grid vertikal
            },
            yaxis: {
              title: "Frequency",
              tickmode: "linear",
              dtick: 1500, // Supaya angka di sumbu Y muncul dengan interval yang pas
              showline: true, // Menampilkan garis utama sumbu Y
              zeroline: true,
            },
            showlegend: true,
            legend: {
              orientation: "h",
              x: 0.5,
              y: -0.2,
              xanchor: "center",
            },
            margin: { l: 50, r: 10, t: 20, b: 50 }, // Pastikan label tidak terpotong
            barmode: "group"
          }}
          config={{
            displayModeBar: false,
            responsive: true,
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default BarChart;
