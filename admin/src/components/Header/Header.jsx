import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, List, Space, Typography } from "antd";

function Header() {
  return (
    <div className=" border-b-2 border-gray-400">
      <div className="flex items-center justify-between mx-8 py-2 ">
        <img width={60} src="/logo2.png" alt="logo"></img>
        <div className="text-2xl font-bold">Admin</div>
        <Space>
          <Badge count={1} dot className="mx-4">
            <MailOutlined className="text-xl " />
          </Badge>
          <Badge count={2} size="small">
            <BellFilled className="text-xl" />
          </Badge>
        </Space>
        <Drawer title="Comments" open={false} maskClosable>
          <List
            dataSource={1}
            renderItem={(item) => {
              return <List.Item>{item.body}</List.Item>;
            }}
          ></List>
        </Drawer>
        <Drawer
          title="Notifications"
          open={false}
          // onClose={() => {
          //   setNotificationsOpen(false);
          // }}
          maskClosable
        >
          <List
            dataSource={1}
            renderItem={(item) => {
              return (
                <List.Item>
                  <Typography.Text strong>{item.title}</Typography.Text> has
                  been ordered!
                </List.Item>
              );
            }}
          ></List>
        </Drawer>
      </div>
    </div>
  );
}
export default Header;
