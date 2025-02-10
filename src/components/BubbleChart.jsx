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
    data &&
    Array.isArray(data.x_data) &&
    Array.isArray(data.y_data) &&
    data.x_data.length > 0 &&
    data.y_data.length > 0;

  // Provide fallback data if JSON is invalid
  const safeData = isValidData
    ? data
    : {
        x_data: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        y_data: [5000, 10000, 7000, 15000, 12000, 9000, 11000],
      };

  // Get min and max for auto-scaling
  const xMin = Math.min(...safeData.y_data) * 0.8; // Slightly decrease for better fit
  const xMax = Math.max(...safeData.y_data) * 1.2; // Slightly increase for better fit

  // Define custom colors
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
    "#90A4AE", // Gray
  ];

  // Convert to Bubble Chart format
  const chartData = {
    labels: safeData.x_data, // Ensure correct x_data labels
    datasets: safeData.x_data.map((day, index) => ({
      label: day, // Display x_data in legend
      data: [
        {
          x: safeData.x_data[index], // Use the actual x_data value
          y: safeData.y_data[index], // Sales amount
          r: (safeData.y_data[index] / xMax) * 50, // Scale bubble size dynamically
        },
      ],
      backgroundColor: customColors[index % customColors.length],
      borderColor: customColors[index % customColors.length],
      borderWidth: 2,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 0,
        },
      },
      y: {
        suggestedMin: xMin, // Dynamically set minimum y-axis value
        suggestedMax: xMax, // Dynamically set maximum y-axis value
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 20, // Increase box width for better spacing
          padding: 15, // Add spacing between legend items
        },
      },
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
