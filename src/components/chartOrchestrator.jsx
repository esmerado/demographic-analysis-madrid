// Components
import { BarChart } from "./barChart";
import { LineChart } from "./lineChart";

const ChartOrchestrator = ({ chartType = "barChart", ...props }) => {
  switch (chartType) {
    case "lineChart":
      return <LineChart {...props} />;
    case "barChart":
    default:
      return <BarChart {...props} />;
  }
};

export { ChartOrchestrator };
