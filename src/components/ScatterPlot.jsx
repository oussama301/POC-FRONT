import { Typography} from "@mui/material";

import React from "react";
import { ResponsiveScatterPlot } from '@nivo/scatterplot';

const ScatterPlot = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Invalid data for ScatterPlot", data);
    return <Typography color="error.main">Invalid ScatterPlot data</Typography>;
  }

  return (
    <ResponsiveScatterPlot
      data={[
        {
          id: "scatter",
          data: data.map((item) => ({
            x: item.id,
            y: item.value,
          })),
        },
      ]}
      margin={{ top: 40, right: 40, bottom: 70, left: 90 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
      colors={{ scheme: "nivo" }}
    />
  );
};

export default ScatterPlot;
