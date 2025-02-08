import { ResponsiveSankey } from '@nivo/sankey';
import { Typography } from '@mui/material';

const ConnectionMap = ({ data }) => {
  // Ensure data exists and is correctly structured
  if (!data || !data.nodes || !data.links) {
    console.error("Invalid data for ConnectionMap:", data);
    return <Typography color="error.main">Error: Invalid data for Connection Map</Typography>;
  }

  return (
    <ResponsiveSankey
      data={data}
      margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
      align="justify"
      colors={{ scheme: 'category10' }}
      nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
      linkOpacity={0.5}
      linkBlendMode="multiply"
      enableLinkGradient={true}
    />
  );
};

export default ConnectionMap;
