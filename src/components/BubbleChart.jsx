import React from "react";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const BubbleChart = ({ data, title }) => {
  console.log("🚀 BubbleChart received data:", JSON.stringify(data, null, 2));

  // Ensure data is valid
  const isValidData =
    data && Array.isArray(data.x_data) && Array.isArray(data.y_data) && data.x_data.length > 0 && data.y_data.length > 0;

  // Provide fallback data if JSON is invalid
  const safeData = isValidData
    ? data
    : {
        x_data: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        y_data: [5000, 10000, 7000, 15000, 12000, 9000, 11000],
      };
      const customColors = [
        "#FFB74D", // Orange
        "#64B5F6", // Blue
        "#81C784", // Green
        "#BA68C8", // Purple
        "#FFD54F", // Yellow
        "#E57373", // Red
        "#4DB6AC", // Teal
        "#7986CB", // Indigo
        "#A1887F", // Brown
        "#90A4AE"  // Gray
      ];
  // Convert to Bubble Chart format
  const chartData = {
    datasets: [
      {
        label: title || "Bubble Chart",
        data: safeData.x_data.map((day, index) => ({
          x: index, // Use index for positioning
          y: safeData.y_data[index], // Sales amount
          r: Math.sqrt(safeData.y_data[index]) / 2, // Bubble size (scaled for visibility)
        })),
        backgroundColor: ({ index }) => customColors[index % customColors.length],
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",

        ticks: {
          callback: function (value) {
            return safeData.x_data[value] || ""; // Show day names
          },
        },
      },
      y: {
     
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Sales: $${context.raw.y}`,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Bubble data={chartData} options={options} />
    </div>
  );
};

export default BubbleChart;
