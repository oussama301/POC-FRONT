import { ResponsiveChoropleth } from '@nivo/geo';
import { features as worldFeatures } from './world_countries';

const BubbleMap = ({ data }) => (
    <ResponsiveChoropleth
        data={data}
        features={worldFeatures.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="blues"
        domain={[0, 1000000]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
    />
);

export default BubbleMap;