import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { WordCloudController, WordElement } from "chartjs-chart-wordcloud";

Chart.register(...registerables, WordCloudController, WordElement);

const WordCloud = ({ words, options }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!chartRef.current || words.length === 0) return;
        
        console.log("📌 Rendering word cloud chart...");
        const ctx = chartRef.current.getContext("2d");
 
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: "wordCloud",
            data: {
                labels: words.map(word => word.text),
                datasets: [
                    {
                        label: "Word Cloud",
                        data: words.map(word => word.size),
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                layout: {
                    padding: 10,
                },
                elements: {
                    word: {
                        fontFamily: options.fontFamily || "Arial, sans-serif",
                        fontSize: (ctx) => ctx.raw * (options.scale || 1.5),
                        rotate: options.rotate || 0,
                        color: (ctx) => (options.randomColor ? getRandomColor() : options.color || "#000"),
                    },
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [words, options]);

    const getRandomColor = () => {
        const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFC733", "#57FF33"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div style={{ width: "100%", height: "600px", overflow: "hidden" }}>
            <canvas ref={chartRef} style={{ width: "100%", height: "100%" }} />
        </div>
    );
};

export default WordCloud;
