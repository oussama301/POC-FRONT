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
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      colors={{ scheme: "nivo" }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: "auto", max: "auto" }}
      axisBottom={{
        //legend: "X-axis",
        legendOffset: 36,
        legendPosition: "middle",
        tickTextColor: textColor,
        legendTextColor: textColor,
      }}
      axisLeft={{
        //legend: "Y-axis",
        legendOffset: -40,
        legendPosition: "middle",
        tickTextColor: textColor,
        legendTextColor: textColor,
      }}
      theme={{
        textColor: textColor,
      }}
    />
  );
};

export default LineChart;
