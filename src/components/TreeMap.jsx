import React from "react";
import Plot from "react-plotly.js";

const TreeMapComponent = ({ data, title }) => {
  console.log("🚀 TreeMap received raw data:", JSON.stringify(data, null, 2));

  // 🔹 Validate data before processing
  const isValidData =
    data &&
    Array.isArray(data.x_data) &&
    Array.isArray(data.y_data) &&
    data.x_data.length > 0 &&
    data.y_data.length > 0 &&
    data.x_data.length === data.y_data.length;

  if (!isValidData) {
    console.error("❌ Invalid TreeMap data! Using fallback values.");
  }

  // 🔹 Provide fallback data if input is invalid
  const safeData = isValidData
    ? data
    : {
        x_data: ["North America", "Europe", "Asia", "South America"],
        y_data: [6841, 37040, 35464, 37281], // Default values
      };

  // 🔹 Format the data for Plotly TreeMap
  const plotData = [
    {
      type: "treemap",
      labels: safeData.x_data, // Categories
      parents: Array(safeData.x_data.length).fill(""), // Root node
      values: safeData.y_data, // Numeric values
      textinfo: "label+value",
      marker: { colorscale: "Viridis" }, // Color gradient
    },
  ];

  return (
    <div style={{ width: "100%", height: "370px", padding: "10px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px", color: "#4CAF50" }}>{title}</h3>
      <Plot
        data={plotData}
        layout={{
          autosize: true,
          margin: { l: 10, r: 10, t: 10, b: 10 },
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default TreeMapComponent;
