import React from "react";
import Plot from "react-plotly.js";

const HeatMapComponent = ({ data, title }) => {
  console.log("🚀 HeatMap received data:", JSON.stringify(data, null, 2));

  // 🔹 Ensure valid data
  const isValidData = data && Array.isArray(data.x_data) && Array.isArray(data.y_data) && Array.isArray(data.matrix);
  
  const safeData = isValidData
    ? data
    : {
        x_data: ["North America", "Europe", "Asia", "South America"],
        y_data: ["Q1", "Q2", "Q3", "Q4"],
        matrix: [
          [30, 40, 50, 20], // Q1
          [80, 20, 70, 30], // Q2
          [90, 30, 60, 40], // Q3
          [40, 50, 80, 90], // Q4
        ],
      };

  console.log("✅ Processed HeatMap Data:", safeData);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
      <div style={{ width: "90%", maxWidth: "700px", padding: "20px", background: "#f5f5f5", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <h3 style={{ textAlign: "center", marginBottom: "10px", color: "#4CAF50" }}>{title}</h3>
        <Plot
          data={[
            {
              z: safeData.matrix,
              x: safeData.x_data,
              y: safeData.y_data,
              type: "heatmap",
              colorscale: "Viridis", // Options: "Blues", "Greens", "Hot", "Jet", etc.
              showscale: true, // Show the color scale legend
            },
          ]}
          layout={{
            title: "", // Remove built-in title to keep our custom one
            autosize: true,
            margin: { l: 50, r: 50, t: 10, b: 50 },
            xaxis: { title: "Regions", side: "bottom", tickangle: -45 },
            yaxis: { title: "Quarters" },
            plot_bgcolor: "#ffffff",
            paper_bgcolor: "transparent", // Removes the white background
          }}
          style={{ width: "100%", height: "350px" }}
          config={{ responsive: true }}
        />
      </div>
    </div>
  );
};

export default HeatMapComponent;
