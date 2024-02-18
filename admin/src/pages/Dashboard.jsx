import { useEffect, useState } from "react";
import OverviewTotal from "../components/Home/OverviewTotal";
import { getOrdersByMonthApi } from "../apis/orderApi";
import Loading from "../components/Home/Loading";
import OrdersChart from "../components/Home/OrdersChart";
import CustomersChart from "../components/Home/CustomersChart";
import { getCustomersByMonthApi } from "../apis/userApi";

function Dashboard() {
  const [orders, setOrders] = useState();
  const [customers, setCustomers] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingCustomer, setLoadingCustomer] = useState(true);

  const getOrders = async () => {
    const response = await getOrdersByMonthApi();
    if (response.status === 200) {
      setOrders(response.data.data.orders);
      setLoading(false);
    }
  };

  const getCustomers = async () => {
    const response = await getCustomersByMonthApi();
    if (response.status === 200) {
      setCustomers(response.data.data.customers);
      setLoadingCustomer(false);
    }
  };
  useEffect(() => {
    getOrders();
    getCustomers();
  }, []);

  if (loading || loadingCustomer) return <Loading />;
  return (
    <div className="m-4">
      <OverviewTotal />
      <div className="flex gap-4">
        <div className="w-1/2">
          <OrdersChart orders={orders} />
        </div>
        <div className="w-1/2">
          <CustomersChart customers={customers} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
