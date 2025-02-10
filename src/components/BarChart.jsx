import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ data }) => {
  if (!data || !data.x_data || !data.y_data) {
    return <div>Invalid BarChart Data</div>;
  }

  // Calculate total value to compute percentages for tooltip
  const total = data.y_data.reduce((sum, value) => sum + value, 0);

  // Format data for Nivo
  const formattedData = data.x_data.map((x, index) => ({
    category: x,
    value: data.y_data[index],
  }));

  // Define custom color palette
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

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveBar
        data={formattedData}
        keys={["value"]}
        indexBy="category"
        margin={{ top: 50, right: 200, bottom: 70, left: 60 }} // Increased right margin for spacing
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        
        // Apply custom colors
        colors={({ index }) => customColors[index % customColors.length]}

        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        
        // Display values inside the bars
        label={(d) => d.value}
        labelSkipHeight={20}
        labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}

        // Tooltip to show percentage
        tooltip={({ id, value, index }) => (
          <div
            style={{
              background: "white",
              padding: "10px",
              border: "1px solid #ccc",
              color: "#333",
            }}
          >
            <strong>{id}</strong>: {((value / total) * 100).toFixed(2)}%
          </div>
        )}

        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Categories", // Display x-axis legend
          legendPosition: "middle",
          legendOffset: 50,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Value",
          legendPosition: "middle",
          legendOffset: -50,
        }}

        legends={[
          {
            data: data.x_data.map((x, index) => ({
              id: x,
              label: x, // Display x_data values
              color: customColors[index % customColors.length],
            })),
            anchor: "right", // Position legend on the right side
            direction: "column",
            justify: false,
            translateX: 150, // Increased spacing from chart
            itemWidth: 100,
            itemHeight: 25, // Increased height for better spacing
            itemTextColor: "#333",
            symbolSize: 20,
            symbolSpacing: 8, // Added spacing between legend items
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default BarChart;
