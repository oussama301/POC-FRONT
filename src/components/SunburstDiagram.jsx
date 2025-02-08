import React from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";

const SunburstDiagram = ({ data }) => {
  if (!data || !data.x_data || !data.y_data) {
    return <div>No data provided for the sunburst diagram.</div>;
  }

  // Transform data into a hierarchical format for Nivo Sunburst
  const createHierarchy = (xData, yData) => ({
    name: "root",
    children: xData.map((label, index) => ({
      name: label,
      value: yData[index],
    })),
  });

  const hierarchicalData = createHierarchy(data.x_data, data.y_data);

  return (
    <ResponsiveSunburst
      data={hierarchicalData}
      margin={{ top: 40, right: 20, bottom: 20, left: 20 }}
      identity="name"
      value="value"
      cornerRadius={2}
      borderWidth={1}
      borderColor={{ theme: "background" }}
      colors={{ scheme: "nivo" }}
      childColor={{ from: "color", modifiers: [["brighter", 0.1]] }}
      animate={true}
      motionConfig="gentle"
    />
  );
};

export default SunburstDiagram;
