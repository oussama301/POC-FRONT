import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

const RadarChart = ({ data, theme }) => {
  if (!data || !data.x_data || !data.y_data) {
    return <div>Invalid RadarChart Data</div>;
  }

  const formattedData = data.x_data.map((x, index) => ({
    category: x,
    value: data.y_data[index],
  }));

  const textColor = theme === "dark" ? "#FFFFFF" : "#333333";

  return (
    <ResponsiveRadar
      data={formattedData}
      keys={["value"]}
      indexBy="category"
      maxValue="auto"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      borderColor={{ from: "color" }}
      dotBorderColor={{ from: "color" }}
      theme={{
        textColor: textColor,
      }}
      axisBottom={{
        tickTextColor: textColor,
        legendTextColor: textColor,
      }}
      axisLeft={{
        tickTextColor: textColor,
        legendTextColor: textColor,
      }}
    />
  );
};

export default RadarChart;
