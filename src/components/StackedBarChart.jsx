import { ResponsiveBar } from '@nivo/bar';

const StackedBarChart = ({ data }) => {
  const transformedData = data.categories.map((category, index) => {
    const entry = { category };
    data.stacks.forEach((stack) => {
      entry[stack.name] = stack.values[index];
    });
    return entry;
  });

  return (
    <ResponsiveBar
      data={transformedData}
      keys={data.stacks.map((stack) => stack.name)}
      indexBy="category"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: 'nivo' }}
      axisBottom={{ tickPadding: 5 }}
      axisLeft={{ tickPadding: 5 }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'top-right',
          direction: 'column',
          itemWidth: 100,
          itemHeight: 20,
        },
      ]}
    />
  );
};

export default StackedBarChart;
