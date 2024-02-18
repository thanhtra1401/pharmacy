import { Card, Space, Statistic, Tooltip } from "antd";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";

import CountUp from "react-countup";
import { useEffect, useState } from "react";
import { getOrdersApi } from "../../apis/orderApi";
import { getCustomersApi } from "../../apis/userApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getProductsApi } from "../../apis/productApi";
import { getDiscountsApi } from "../../apis/discountApi";
import Loading from "./Loading";

function OverviewTotal() {
  const formatter = (value) => <CountUp end={value} separator="," />;
  const [orders, setOrders] = useState();
  const [customers, setCustomers] = useState();
  const [revenue, setRevenue] = useState(0);
  const [products, setProducts] = useState();
  const [discounts, setDiscounts] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getDiscounts = async () => {
      const response = await getDiscountsApi();
      if (response?.status === 200) {
        setDiscounts(response.data.data.discounts);
      }
    };
    const getOrder = async () => {
      const response = await getOrdersApi();
      if (response.status === 200) {
        setOrders(response.data.data.orders);

        const ordersDone = response.data.data.orders.filter(
          (order) => order.status === 2
        );
        if (ordersDone) {
          setRevenue(
            ordersDone.reduce((total, order) => total + order.totalPrice, 0)
          );
        }
      }
    };
    const getProducts = async () => {
      const response = await getProductsApi({ size: 10000 });
      if (response?.status === 200) {
        setProducts(response.data.data.products);
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
          text: "Có lỗi xảy ra",

          icon: "error",
        });
      }
    };
    getOrder();
    getProducts();
    getCustomer();
    getDiscounts();
  }, []);

  const findDiscountMax = (arr) => {
    let max = arr[0].OrderDetails.length;
    let index = 0;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i].OrderDetails.length > max) {
        max = arr[i].OrderDetails.length;
        index = i;
      }
    }
    return arr[index];
  };

  const findOrderMax = (arr) => {
    let max = arr[0].totalPrice;
    let index = 0;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i].totalPrice > max) {
        max = arr[i].totalPrice;
        index = i;
      }
    }
    return arr[index];
  };

  const findCustomerMax = (arr) => {
    let max = arr[0].Orders.length;
    let index = 0;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i].Orders.length > max) {
        max = arr[i].Orders.length;
        index = i;
      }
    }
    return arr[index];
  };

  const findProductMax = (arr) => {
    let max = arr[0].sold;
    let index = 0;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i].sold > max) {
        max = arr[i].sold;
        index = i;
      }
    }
    return arr[index];
  };

  if (!orders || !products || !customers || !discounts) return <Loading />;

  return (
    <div>
      <Space size={20} direction="vertical">
        <Space direction="horizontal">
          <Card
            onClick={() => navigate("/don-hang")}
            className="cursor-pointer"
          >
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
          <Card
            onClick={() => navigate("/khach-hang")}
            className="cursor-pointer"
          >
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

          <Card
            className="cursor-pointer"
            onClick={() => navigate("/don-hang")}
          >
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

          <Card
            className="cursor-pointer"
            onClick={() => navigate("/san-pham/tat-ca-san-pham")}
          >
            <Space direction="horizontal">
              <MedicineBoxOutlined
                style={{
                  color: "black",
                  backgroundColor: "yellow",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
              <Statistic
                title={"Sản phẩm"}
                value={products.length}
                formatter={formatter}
              />
            </Space>
          </Card>

          <Card
            className="cursor-pointer"
            onClick={() =>
              navigate("/khuyen-mai/tat-ca-chuong-trinh-khuyen-mai")
            }
          >
            <Space direction="horizontal">
              <PayCircleOutlined
                style={{
                  color: "white",
                  backgroundColor: "red",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
              <Statistic
                title={"Chương trình khuyến mại"}
                value={discounts.length}
                formatter={formatter}
              />
            </Space>
          </Card>
        </Space>
      </Space>

      <div className="my-4">
        <div>
          <span className="font-medium">Đơn hàng giá trị cao nhất: </span>

          <Tooltip title="Xem chi tiết" color="blue">
            <span
              className="text-blue-500 hover:text-blue-600 cursor-pointer hover:underline"
              onClick={() =>
                navigate(
                  `/don-hang/chi-tiet-don-hang/${findOrderMax(orders).id}`
                )
              }
            >
              Đơn hàng mã {findOrderMax(orders).id}
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="my-4">
        <div>
          <span className="font-medium">Khách hàng có lượt mua cao nhất: </span>

          <Tooltip title="Xem chi tiết" color="blue">
            <span
              className="text-blue-500 hover:text-blue-600 cursor-pointer hover:underline"
              onClick={() =>
                navigate(
                  `/khach-hang/chi-tiet-khach-hang/${
                    findCustomerMax(customers).id
                  }`
                )
              }
            >
              {findCustomerMax(customers).lastName +
                " " +
                findCustomerMax(customers).firstName}
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="my-4">
        <div>
          <span className="font-medium">Sản phẩm bán chạy nhất: </span>

          <Tooltip title="Xem chi tiết" color="blue">
            <span
              className="text-blue-500 hover:text-blue-600 cursor-pointer hover:underline"
              onClick={() =>
                navigate(
                  `/san-pham/chi-tiet-san-pham/${findProductMax(products).id}`
                )
              }
            >
              {findProductMax(products).name}
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="my-4">
        <div>
          <span className="font-medium">
            Chương trình khuyến mại có nhiều lượt đặt hàng nhất:{" "}
          </span>

          <Tooltip title="Xem chi tiết" color="blue">
            <span
              className="text-blue-500 hover:text-blue-600 cursor-pointer hover:underline"
              onClick={() =>
                navigate(
                  `/khuyen-mai/chi-tiet-chuong-trinh/${
                    findDiscountMax(discounts).id
                  }`
                )
              }
            >
              {findDiscountMax(discounts).name}
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default OverviewTotal;
