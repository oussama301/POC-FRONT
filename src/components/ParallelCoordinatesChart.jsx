import React from "react";
import { ResponsiveParallelCoordinates } from "@nivo/parallel-coordinates";

const ParallelCoordinatesPlot = ({ data }) => {
  if (!data || !data.x_data || !data.y_data) {
    return <div>No data provided for the parallel coordinates plot.</div>;
  }

  // Transform data into the expected format
  const plotData = data.x_data.map((x, index) => ({
    x,
    y: data.y_data[index],
  }));

  return (
    <ResponsiveParallelCoordinates
      data={plotData}
      variables={[
        { key: "x", type: "linear", min: "auto", max: "auto", ticksPosition: "before" },
        { key: "y", type: "linear", min: "auto", max: "auto", ticksPosition: "after" },
      ]}
      margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
      theme={{
        axis: { ticks: { text: { fontSize: 12 } } },
      }}
    />
  );
};

export default ParallelCoordinatesPlot;
