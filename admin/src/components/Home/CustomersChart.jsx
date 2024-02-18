import { useState } from "react";
import BarChart from "../Chart/BarChar";

import PropTypes from "prop-types";
CustomersChart.propTypes = {
  customers: PropTypes.array,
};
function CustomersChart({ customers }) {
  const [customersData] = useState({
    labels: customers.map((item) => item.month + "/" + item.year),
    datasets: [
      {
        label: "Số khách hàng",
        data: customers.map((item) => item.totalCustomers),
        backgroundColor: "#D93D2A",
      },
    ],
  });
  return (
    <div>
      <BarChart
        chartData={customersData}
        text={"Số lượng khách hàng mới theo tháng"}
      />
    </div>
  );
}

export default CustomersChart;
