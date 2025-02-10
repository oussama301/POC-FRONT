import React from "react";
import { ResponsiveLine } from "@nivo/line";

const LineChart = ({ data, theme }) => {
  if (!data || !data.x_data || !data.y_data) {
    return <div>Invalid Line Chart Data</div>;
  }

  const transformedData = [
    {
      id: "Line",
      data: data.x_data.map((x, index) => ({
        x,
        y: data.y_data[index],
      })),
    },
  ];

  const textColor = theme === "dark" ? "#FFFFFF" : "#333333";

  return (
    <ResponsiveLine
      data={transformedData}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      colors={{ scheme: "nivo" }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: "auto", max: "auto" }}
      
      // Tooltip to display values on hover
      tooltip={({ point }) => (
        <div
          style={{
            background: "white",
            padding: "8px",
            border: "1px solid #ccc",
            color: "#333",
            fontSize: "14px",
          }}
        >
          <strong>{point.serieId}</strong>: {point.data.yFormatted}
        </div>
      )}

      axisBottom={{
        legendOffset: 36,
        legendPosition: "middle",
        tickTextColor: textColor,
        legendTextColor: textColor,
      }}
      axisLeft={{
        legendOffset: -40,
        legendPosition: "middle",
        tickTextColor: textColor,
        legendTextColor: textColor,
      }}

      // Add legend on the right side
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 5,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          symbolSize: 12,
          symbolShape: "circle",
        },
      ]}

      theme={{
        textColor: textColor,
      }}
    />
  );
};

export default LineChart;
