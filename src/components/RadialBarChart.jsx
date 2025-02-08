import React from "react";
import { ResponsiveRadialBar } from "@nivo/radial-bar";

const RadialBarChart = ({ data }) => {
  // Validate and log data
  if (!data || !data.x_data || !data.y_data) {
    console.error("Invalid data provided to RadialBarChart:", data);
    return <div>Invalid data for Radial Bar Chart</div>;
  }

  // Transform data for Nivo
  const formattedData = data.x_data.map((label, index) => ({
    id: label,
    value: data.y_data[index],
  }));

  // Wrap data into the required structure
  const nivoData = [
    {
      id: "Sales",
      data: formattedData,
    },
  ];

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <ResponsiveRadialBar
        data={nivoData}
        valueFormat=">-.2f"
        maxValue="auto"
        startAngle={-90}
        endAngle={270}
        innerRadius={0.3}
        padding={0.4}
        cornerRadius={2}
        margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
        colors={{ scheme: "nivo" }}
        radialAxisStart={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        circularAxisOuter={{
          tickSize: 5,
          tickPadding: 12,
          tickRotation: 0,
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateX: 0,
            translateY: 56,
            itemWidth: 100,
            itemHeight: 18,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            symbolSize: 18,
          },
        ]}
        animate={true} // Ensure animation is explicitly set
        motionConfig="gentle"
        enableTracks={true}
        tracksColor="#f0f0f0"
      />
    </div>
  );
};

export default RadialBarChart;
