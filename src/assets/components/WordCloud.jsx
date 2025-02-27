import React, { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { WordCloudController, WordElement } from "chartjs-chart-wordcloud";
import { fetchSentimentCloud } from "../../api/restApi";

Chart.register(...registerables, WordCloudController, WordElement);

const WordCloud = ({ options }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [words, setWords] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("🔄 Fetching word cloud data...");
                const data = await fetchSentimentCloud();
                
                const transformedData = data.map(item => ({
                    text: item.word,
                    size: item.frequency
                }));
                
                setWords(transformedData);
                console.log("📊 Word cloud data transformed:", transformedData);
            } catch (error) {
                console.error("❌ Error fetching word cloud data:", error);
            }
        };

        fetchData();
    }, []);

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
        <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
            <canvas ref={chartRef} style={{ width: "100%", height: "100%" }} />
        </div>
    );
};

export default WordCloud;