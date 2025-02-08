import React from "react";
import { useFilters } from "../context/FilterContext";
import { Box, Typography, useTheme } from "@mui/material";
import StatBox from "./StatBox"; // Import KPI component
import { tokens } from "../theme";

// Import all chart components
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import StackedBarChart from "./StackedBarChart";
import HeatMap from "./HeatMap";
import FunnelChart from "./FunnelChart";
import TableChart from "./TableChart";
import ScatterPlot from "./ScatterPlot";
import ChoroplethMap from "./ChoroplethMap";
import RadialBarChart from "./RadialBarChart";
import RadarChart from "./RadarChart";
import CirclePackingChart from "./CirclePackingChart";
import ConnectionMap from "./ConnectionMap";
import DonutChart from "./PieChart";
import DotMap from "./DotMap";
import FlowMap from "./FlowMap";
import SpiralChart from "./SpiralChart";
import TreemapChart from "./TreeMap";
import BubbleChart from "./BubbleChart";
import ArcDiagram from "./ArcDiagram";

// Allowed visualization types mapping (fix names)
const chartComponents = {
  "arc diagram":ArcDiagram,
  "bubble chart": BubbleChart,
  "line chart": LineChart,
  "bar chart": BarChart,
  "stacked bar chart": StackedBarChart,
  "donut chart": DonutChart,
  "heatmap": HeatMap, // ✅ Fixing the name (was "heat map")
  "funnel chart": FunnelChart,
  "table chart": TableChart,
  "scatter plot": ScatterPlot,
  "choropleth map": ChoroplethMap,
  "radial bar chart": RadialBarChart,
  "radar chart": RadarChart,
  "circle packing": CirclePackingChart,
  "connection map": ConnectionMap,
  "dot map": DotMap,
  "flow map": FlowMap,
  "spiral chart": SpiralChart,
  "treemap": TreemapChart,
};

// Define filterable keywords
const filterKeywords = [
  "month", "product", "time", "regions", "account", "segments",
  "categories", "sales_channel", "performance", "quantity",
  "amount", "number", "countries"
];

const Chart = ({ visual }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { filters } = useFilters();

  const visualizationType =
    visual?.type?.trim().toLowerCase() || visual?.type_visuals?.trim().toLowerCase();

  if (visualizationType === "kpi") {
    return (
      <StatBox title={visual.data?.score || "N/A"} subtitle={visual.indicator || "KPI"} />
    );
  }

  const ChartComponent = chartComponents[visualizationType];

  if (!visualizationType || !ChartComponent) {
    console.warn(`Unsupported visual type: ${visualizationType}`, visual);
    return (
      <Typography color="error.main" textAlign="center">
        Invalid or unsupported visual type: "{visualizationType || "undefined"}"
      </Typography>
    );
  }

  // 🔹 Ensure `x_data` and `y_data` exist before processing
  if (!visual.data || !Array.isArray(visual.data.x_data) || !Array.isArray(visual.data.y_data)) {
    console.error(`Error: Missing data for ${visualizationType}`, visual);
    return <Typography color="error.main">Error: Missing data for {visualizationType} chart</Typography>;
  }

  // 🔹 Ensure `x_data` and `y_data` are valid before using `.forEach`
  let { x_data, y_data } = visual.data;
  if (!visual.data.x_data) {
    console.warn("⚠️ `x_data` is missing! Generating default values.");
    visual.data.x_data = ["Default-1", "Default-2", "Default-3"];
  }
  
  if (!visual.data.y_data) {
    console.warn("⚠️ `y_data` is missing! Generating random values.");
    visual.data.y_data = [Math.random() * 100, Math.random() * 100, Math.random() * 100];
  }
  

  // 🔹 Ensure `x_data` and `y_data` have matching lengths
  if (x_data.length !== y_data.length) {
    console.warn(`Data length mismatch for ${visualizationType}. Auto-filling missing values.`);
    const maxLength = Math.max(x_data.length, y_data.length);
    while (x_data.length < maxLength) x_data.push(`Missing-${x_data.length}`);
    while (y_data.length < maxLength) y_data.push(0);
  }

  console.log(`Rendering Chart: ${visualizationType} with`, { x_data, y_data });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%" height="100%">
      {visual.indicator && (
        <Typography variant="h6" sx={{ marginBottom: 1, color: colors.greenAccent[500] }}>
          {visual.title}
        </Typography>
      )}
      <Box width="100%" height="100%">
        <ChartComponent data={{ x_data, y_data }} />
      </Box>
    </Box>
  );
};

export default Chart;
