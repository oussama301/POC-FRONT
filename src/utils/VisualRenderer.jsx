import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

// Import individual visualization components
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import StackedBarChart from "../components/StackedBarChart";
import PieChart from "../components/PieChart";
import HeatMap from "../components/HeatMap";
import FunnelChart from "../components/FunnelChart";
import TableChart from "../components/TableChart";
import ScatterPlot from "../components/ScatterPlot";
import ChoroplethMap from "../components/ChoroplethMap";
import RadialBarChart from "../components/RadialBarChart";
import RadarChart from "../components/RadarChart";
import CirclePackingChart from "../components/CirclePackingChart";
import StatBox from "../components/StatBox";


const ALLOWED_VISUAL_TYPES = [
  "KPI",
  "line chart",
  "bar chart",
  "stacked bar chart",
  "donut chart",
  "heat map",
  "funnel chart",
  "table chart",
  "scatter plot",
  "choropleth map",
  "radial bar chart",
  "radar chart",
  "circle packing",
];

const VisualRenderer = ({ visual }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const type = visual?.type || visual?.type_visuals;

  if (!type || !ALLOWED_VISUAL_TYPES.includes(type)) {
    return (
      <Typography color="error.main" textAlign="center">
        Invalid or unsupported visual type: "{type || "undefined"}"
      </Typography>
    );
  }

  const renderVisualization = () => {
  const { type, type_visuals, data, indicator } = visual;
  const visualizationType = type || type_visuals;

  switch (visualizationType) {
    case "KPI":
      return (
        <StatBox
          title={data?.score || "N/A"}
          subtitle={indicator || "KPI"}
        />
      );
      case "line chart":
        return <LineChart data={data} />;
      case "bar chart":
        return <BarChart data={data} />;
      case "stacked bar chart":
        return <StackedBarChart data={data} />;
      case "donut chart":
        return <PieChart data={data} />;
      case "heat map":
        return <HeatMap data={data} />;
      case "funnel chart":
        return <FunnelChart data={data} />;
      case "scatter plot":
        return <ScatterPlot data={data} />;
      case "choropleth map":
        return <ChoroplethMap data={data} />;
      case "radial bar chart":
        return <RadialBarChart data={data} />;
      case "radar chart":
        return <RadarChart data={data} />;
      case "circle packing":
        return <CirclePackingChart data={data} />;
      case "table":
        return <TableChart data={data} />;
      default:
          console.error("Unsupported visual:", visual);
          return (
            <Typography color="error.main" textAlign="center">
              Unsupported or invalid visual: {visualizationType || "undefined"}
            </Typography>
          );
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      {visual.indicator && (
        <Typography variant="h6" color={colors.grey[100]}>
          {visual.indicator}
        </Typography>
      )}
      <Box width="100%" height="100%">
        {renderVisualization()}
      </Box>
    </Box>
  );
};

export default VisualRenderer;
