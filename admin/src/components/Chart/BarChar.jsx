import { Bar } from "react-chartjs-2";

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
BarChart.propTypes = {
  chartData: PropTypes.object,
  text: PropTypes.string,
};
function BarChart({ chartData, text }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: text,
      },
    },
  };
  return (
    <div>
      <Bar data={chartData} options={options}></Bar>
    </div>
  );
}

export default BarChart;
