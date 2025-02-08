import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Typography, Box } from "@mui/material";

const AreaGraph = ({ data }) => {
  // Validate and transform data
  if (!data || !data.x_data || !data.y_data || data.x_data.length !== data.y_data.length) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt="20px">
        Invalid data for the Area Graph.
      </Typography>
    );
  }

  // Transform data to Nivo's format
  const transformedData = [
    {
      id: data.indicator || "Area Graph", // Use the indicator field if available
      data: data.x_data.map((x, i) => ({ x, y: data.y_data[i] })),
    },
  ];

  return (
    <Box width="100%" height="300px">
<ResponsiveLine
  data={transformedData}
  margin={{ top: 50, right: 110, bottom: 30, left: 60 }} // Increase bottom margin
  xScale={{ type: 'point' }}
  yScale={{
    type: 'linear',
    min: Math.min(...data.y_data), // Ensure the shaded area starts at the minimum y_data
    max: 'auto',
    stacked: true,
    reverse: false,
  }}
  curve="monotoneX"
  axisTop={null}
  axisRight={null}
  axisBottom={{
    orient: 'bottom',
    tickSize: 5,
    tickPadding: 15, // Increase tick padding
    tickRotation: 0,
    legend: 'Month',
    legendOffset: 80, // Adjust legend offset for more space
    legendPosition: 'middle',
  }}
  axisLeft={{
    orient: 'left',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Costs of Goods Sold ($)',
    legendOffset: -50,
    legendPosition: 'middle',
  }}
  enableGridX={false}
  enableGridY={true}
  areaOpacity={0.2}
  enableArea={true}
  colors={{ scheme: 'nivo' }}
  lineWidth={2}
  pointSize={10}
  pointColor={{ theme: 'background' }}
  pointBorderWidth={2}
  pointBorderColor={{ from: 'serieColor' }}
  pointLabelYOffset={-12}
  useMesh={true}
/>



    </Box>
  );
};

export default AreaGraph;
