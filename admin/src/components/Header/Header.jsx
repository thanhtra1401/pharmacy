import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../apis";

function Header() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  return (
    <div className=" border-b-2 border-gray-400">
      <div className="flex items-center justify-between mx-8 py-2 ">
        <Image width={60} src="./logo2.png"></Image>
        <div className="text-2xl font-bold">Admin</div>
        <Space>
          <Badge count={comments.length} dot className="mx-4">
            <MailOutlined
              className="text-xl "
              onClick={() => {
                setCommentsOpen(true);
              }}
            />
          </Badge>
          <Badge count={orders.length} size="small">
            <BellFilled
              className="text-xl"
              onClick={() => {
                setNotificationsOpen(true);
              }}
            />
          </Badge>
        </Space>
        <Drawer
          title="Comments"
          open={commentsOpen}
          onClose={() => {
            setCommentsOpen(false);
          }}
          maskClosable
        >
          <List
            dataSource={comments}
            renderItem={(item) => {
              return <List.Item>{item.body}</List.Item>;
            }}
          ></List>
        </Drawer>
        <Drawer
          title="Notifications"
          open={notificationsOpen}
          onClose={() => {
            setNotificationsOpen(false);
          }}
          maskClosable
        >
          <List
            dataSource={orders}
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
