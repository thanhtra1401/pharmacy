import { Card, Space, Statistic } from "antd";

// eslint-disable-next-line react/prop-types
function DashboardCard({ icon, title, value }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default DashboardCard;
