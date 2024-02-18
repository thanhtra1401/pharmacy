import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import PropTypes from "prop-types";
LineChart.propTypes = {
  chartData: PropTypes.object,
  title: PropTypes.string,
};
function LineChart({ chartData, title }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  return (
    <div>
      <Line data={chartData} options={options}></Line>
    </div>
  );
}

export default LineChart;
