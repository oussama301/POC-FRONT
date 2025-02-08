import { ResponsiveRadar } from '@nivo/radar';

const SpiralChart = ({ data }) => (
    <ResponsiveRadar
        data={data}
        keys={['value']}
        indexBy="category"
        maxValue="auto"
        curve="linearClosed"
        borderWidth={2}
        colors={{ scheme: 'category10' }}
        borderColor={{ from: 'color' }}
    />
);

export default SpiralChart;
