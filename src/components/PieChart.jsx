import React from "react";
import { ResponsivePie } from "@nivo/pie";

const DonutChart = ({ data, theme }) => {
  if (!data || !data.x_data || !data.y_data) {
    return <div>Invalid DonutChart Data</div>;
  }

  // Calculate total value to compute percentages
  const total = data.y_data.reduce((sum, value) => sum + value, 0);

  const formattedData = data.x_data.map((x, index) => ({
    id: x,
    label: x,
    value: data.y_data[index],
  }));

  const textColor = theme === "dark" ? "#FFFFFF" : "#333333";

  return (
    <ResponsivePie
      data={formattedData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsTextColor={textColor}
      radialLabelsLinkColor={textColor}
      sliceLabelsTextColor={textColor}
      
      // Display percentage inside the donut chart
      arcLabel={(d) => `${((d.value / total) * 100).toFixed(2)}%`}
      arcLabelsTextColor={textColor}

      // Customize tooltip to show exact value
      tooltip={({ datum }) => (
        <div
          style={{
            background: "white",
            padding: "10px",
            border: "1px solid #ccc",
            color: "#333",
          }}
        >
          <strong>{datum.id}</strong>: {datum.value}
        </div>
      )}
      
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          translateX: 0,
          translateY: 56,
          itemWidth: 100,
          itemHeight: 18,
          itemsSpacing: 0,
          itemTextColor: textColor,
          symbolSize: 18,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

export default DonutChart;
