import { useEffect, useState } from "react";
import { getPrescriptionsApi } from "../../apis/prescriptionApi";
import Loading from "../../components/Home/Loading";
import { Link } from "react-router-dom";
import { Image, Space, Table, Tag, Typography } from "antd";

function AllPrescription() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPrescriptions = async () => {
    try {
      const response = await getPrescriptionsApi();
      if (response.status === 200) {
        setPrescriptions(response.data.data.prescriptions);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrescriptions();
  }, []);
  console.log(prescriptions);
  if (loading) return <Loading />;

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Danh sách đơn thuốc</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: "Số thứ tự",
              dataIndex: "Số thứ tự",
              key: "Số thứ tự",
              render: (text, record, index) => index + 1,
            },
            {
              title: "Mã",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Hình ảnh",
              dataIndex: "image",
              key: "image",
              render: (value) => <Image src={value} width={40} />,
            },
            {
              title: "Trạng thái",
              dataIndex: "status",
              key: "status",
              filters: [
                {
                  text: "Đang chờ tư vấn sản phẩm",
                  value: 0,
                },
                {
                  text: "Đã tư vấn sản phẩm",
                  value: 1,
                },
              ],
              onFilter: (value, record) => record.status === value,

              render: (value) => {
                if (value === 0)
                  return <Tag color="blue">Đang chờ tư vấn sản phẩm</Tag>;
                if (value === 1)
                  return <Tag color="green">Đã tư vấn sản phẩm</Tag>;
              },
            },
            {
              title: "Khách hàng",
              dataIndex: "customerId",
              key: "customerId",
              render: (value) => (
                <Link
                  to={`/khach-hang/chi-tiet-khach-hang/${value}`}
                  className="text-blue-500 underline "
                >
                  Xem chi tiết
                </Link>
              ),
            },

            {
              title: "Chi tiết đơn thuốc",
              dataIndex: "id",
              key: "id",
              render: (value) => (
                <Link
                  to={`/don-thuoc/chi-tiet-don-thuoc/${value}`}
                  className="text-blue-500 underline "
                >
                  Xem chi tiết
                </Link>
              ),
            },
          ]}
          pagination={{
            pageSize: 5,
          }}
          dataSource={prescriptions}
        ></Table>
      </Space>
    </div>
  );
}

export default AllPrescription;
