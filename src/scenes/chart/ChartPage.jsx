import { useParams } from "react-router-dom";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
//import DonutChart from "../../components/DonutChart";
import TableChart from "../../components/TableChart";
import RadialBarChart from "../../components/RadialBarChart";
import ChoroplethMap from "../../components/ChoroplethMap";
import CirclePackingChart from "../../components/CirclePackingChart";
import AreaGraph from "../../components/AreaGraph";

const ChartPage = ({ visuals }) => {
  const { id } = useParams(); // Get the chart ID from the URL
  const visual = visuals.find((v) => v.id === parseInt(id)); // Find the visual by ID

  if (!visual) {
    return <div>Chart not found!</div>;
  }

  const renderChart = () => {
    switch (visual.type) {
      case "bar chart":
        return <BarChart data={visual.data} />;
      case "pie chart":
        return <PieChart data={visual.data} />;
      case "line chart":
        return <LineChart data={visual.data} />;
      case "donut chart":
        return <PieChart data={visual.data} />;
      case "table":
        return <TableChart data={visual.data} />;
      case "radial bar chart":
        return <RadialBarChart data={visual.data} />;
      case "choropleth map":
        return <ChoroplethMap data={visual.data} />;
      case "circle packing":
        return <CirclePackingChart data={visual.data} />;
      case "area graph":
        return <AreaGraph data={visual.data} />;
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{visual.title}</h1>
      {renderChart()}
    </div>
  );
};

export default ChartPage;
