import { Card, Space, Statistic } from "antd";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { getOrdersApi } from "../../apis/orderApi";
import { getCustomersApi } from "../../apis/userApi";
import Swal from "sweetalert2";

function OverviewTotal() {
  const formatter = (value) => <CountUp end={value} separator="," />;
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const getOrder = async () => {
      const response = await getOrdersApi();
      if (response.status === 200) {
        setOrders(response.data.data.orders);
        setRevenue(
          response.data.data.orders.reduce(
            (total, order) => total + order.totalPrice,
            0
          )
        );
      }
    };
    const getCustomer = async () => {
      try {
        const response = await getCustomersApi(100000);
        if (response.status === 200) {
          setCustomers(response.data.data.users);
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Có lỗi xảy ra",

          icon: "error",
        });
      }
    };
    getOrder();
    getCustomer();
  }, []);
  return (
    <Space size={20} direction="vertical">
      <Space direction="horizontal">
        <Card>
          <Space direction="horizontal">
            <ShoppingCartOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic
              title={"Đơn hàng"}
              value={orders?.length}
              formatter={formatter}
            />
          </Space>
        </Card>
        <Card>
          <Space direction="horizontal">
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic
              title={"Khách hàng"}
              value={customers?.length}
              formatter={formatter}
            />
          </Space>
        </Card>

        <Card>
          <Space direction="horizontal">
            <DollarCircleOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
            <Statistic
              title={"Doanh thu"}
              value={revenue}
              formatter={formatter}
            />
          </Space>
        </Card>
      </Space>
    </Space>
  );
}

export default OverviewTotal;
