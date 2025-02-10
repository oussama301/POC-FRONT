import React from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import chroma from "chroma-js";

const CirclePackingChart = ({ data, theme }) => {
  if (!data || !data.x_data || !data.y_data) {
    return <div>Invalid CirclePacking Data</div>;
  }

  // Generate color scale for x_data
  const colorScale = chroma.scale(["#FFD700", "#FF8C00", "#FF4500"]).mode("lab");

  const uniqueCategories = [...new Set(data.x_data)];
  const categoryColors = uniqueCategories.reduce((acc, category, index) => {
    acc[category] = colorScale(index / uniqueCategories.length).hex();
    return acc;
  }, {});

  // Transform the data into Nivo's Circle Packing format
  const formattedData = {
    name: "root",
    color: "#E0E0E0", // ✅ Set root color to light gray
    children: data.x_data.map((x, index) => ({
      name: x,
      value: data.y_data[index],
      color: categoryColors[x], // Assign colors dynamically
    })),
  };

  // Define theme colors based on light or dark mode
  const textColor = theme === "dark" ? "#FFFFFF" : "#333333";

  return (
    <div
      style={{
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <ResponsiveCirclePacking
        data={formattedData}
        margin={{ top: 20, right: 120, bottom: 20, left: 20 }}
        id="name"
        value="value"
        colors={(node) => node.data.color || "#E0E0E0"} // ✅ Ensures root is light gray
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

      {/* Compact Legend with Scrollbar */}
      <div
        style={{
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
          background: "white",
          padding: "8px",
          borderRadius: "6px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          fontSize: "12px",
          width: "100px",
          maxHeight: "280px",
          overflowY: "auto",
        }}
      >
        <strong style={{ fontSize: "13px" }}>Legend</strong>
        {uniqueCategories.map((category) => (
          <div key={category} style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: categoryColors[category],
                marginRight: 5,
              }}
            ></div>
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CirclePackingChart;
