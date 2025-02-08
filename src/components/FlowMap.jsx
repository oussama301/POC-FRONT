import { ResponsiveSankey } from '@nivo/sankey';
import { Typography } from '@mui/material';

const FlowMap = ({ data }) => {
  // Ensure data exists and is correctly structured
  if (!data || !data.nodes || !data.links) {
    console.error("Invalid data for FlowMap:", data);
    return <Typography color="error.main">Error: Invalid data for Flow Map</Typography>;
  }

  return (
    <ResponsiveSankey
      data={data}
      margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
      align="center"
      colors={{ scheme: 'nivo' }}
      nodeOpacity={1}
      nodeThickness={18}
      nodeInnerPadding={3}
      linkOpacity={0.5}
      linkHoverOthersOpacity={0.1}
    />
  );
};

export default FlowMap;
