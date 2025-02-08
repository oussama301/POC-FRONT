import React from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";

const CirclePackingChart = ({ data, theme }) => {
  if (!data || !data.x_data || !data.y_data) {
    return <div>Invalid CirclePacking Data</div>;
  }

  // Transform the data into the format required by Nivo's ResponsiveCirclePacking
  const formattedData = {
    name: "root",
    children: data.x_data.map((x, index) => ({
      name: x,
      value: data.y_data[index],
    })),
  };

  // Define theme colors based on light or dark mode
  const textColor = theme === "dark" ? "#FFFFFF" : "#333333";
  return (
    <div
      style={{
        height: 400,
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <ResponsiveCirclePacking
        data={formattedData}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        id="name"
        value="value"
        colors={{ scheme: "nivo" }}
        childColor={{ from: "color", modifiers: [["darker", 0.3]] }}
        padding={4}
        enableLabels={true}
        labelsSkipRadius={10}
        labelTextColor={textColor}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.5]] }}
        theme={{
          textColor: textColor,
        }}
      />
    </div>
  );
};

export default CirclePackingChart;
