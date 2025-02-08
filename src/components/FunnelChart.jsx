import React from "react";
import { ResponsiveFunnel } from '@nivo/funnel';

const FunnelChart = ({ data }) => {
  const transformedData = data.stages.map((stage, index) => ({
    id: stage,
    value: data.values[index],
  }));

  return (
    <ResponsiveFunnel
      data={transformedData}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      colors={{ scheme: 'nivo' }}
    />
  );
};

export default FunnelChart;
