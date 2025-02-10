import React from "react";
import Plot from "react-plotly.js";

const TreeMapComponent = ({ data, title }) => {
  console.log("🚀 TreeMap received raw data:", JSON.stringify(data, null, 2));

  // Validate data before processing
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

  // Provide fallback data if input is invalid
  const safeData = isValidData
    ? data
    : {
        x_data: ["North America", "Europe", "Asia", "South America"],
        y_data: [6841, 37040, 35464, 37281], // Default values
      };

  // Normalize data for color scaling (min-max normalization)
  const minVal = Math.min(...safeData.y_data);
  const maxVal = Math.max(...safeData.y_data);
  const normalizedValues = safeData.y_data.map(
    (val) => (val - minVal) / (maxVal - minVal)
  );

  // Define color scale (Viridis for smooth transition)
  const colorScale = [
    [0, "#440154"], // Dark purple (low values)
    [0.25, "#31688E"], // Blue
    [0.5, "#35B779"], // Green
    [0.75, "#FDE725"], // Yellow
    [1, "#F8FA0D"], // Bright yellow (high values)
  ];

  // Format the data for Plotly TreeMap
  const plotData = [
    {
      type: "treemap",
      labels: safeData.x_data, // Categories
      parents: Array(safeData.x_data.length).fill(""), // Root node
      values: safeData.y_data, // Numeric values
      textinfo: "label+value",
      marker: {
        colors: normalizedValues, // Scaled colors
        colorscale: colorScale, // Apply heatmap colors
        showscale: true, // Show color scale legend
        colorbar: {
          
          thickness: 20,
          tickmode: "array",
          tickvals: [0, 0.5, 1], // Mapping normalized values
          ticktext: [minVal.toLocaleString(), "Mid", maxVal.toLocaleString()], // Display actual values
        },
      },
    },
  ];

  return (
    <div style={{ width: "100%", height: "370px", padding: "10px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px", color: "#4CAF50" }}>{title}</h3>
      <Plot
        data={plotData}
        layout={{
          autosize: true,
          margin: { l: 10, r: 50, t: 10, b: 10 }, // Increased right margin for better legend spacing
          paper_bgcolor: "transparent",
          plot_bgcolor: "transparent",
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default TreeMapComponent;
