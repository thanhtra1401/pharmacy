import { useState } from "react";
import BarChart from "../Chart/BarChar";

import PropTypes from "prop-types";
OrdersChart.propTypes = {
  orders: PropTypes.array,
};
function OrdersChart({ orders }) {
  const [ordersData] = useState({
    labels: orders.map((item) => item.month + "/" + item.year),
    datasets: [
      {
        label: "Số đơn hàng",
        data: orders.map((item) => item.totalOrders),
      },
    ],
  });
  return (
    <div>
      <BarChart chartData={ordersData} text="Số lượng đơn hàng theo tháng" />
    </div>
  );
}

export default OrdersChart;
