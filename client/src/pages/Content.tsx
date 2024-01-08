import { Card } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

function Content() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <div className="container grid grid-cols-12">
      <div className="col-span-2">
        <Card
          className="w-full "
          hoverable
          cover={
            <img
              alt="Product"
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/256x256/https://cms-prod.s3-sgn09.fptcloud.com/00029275_dacolfort_500mg_danapha_3x10_6954_6062_large_fdad157540.jpg"
            />
          }
        >
          <Card.Meta
            description="Thuốc Dacolfort 500mg Danapha điều trị suy tĩnh mạch, mạch bạch huyết (3 vỉ x 10 viên)"
            className=""
          />
          <p>Giá: $100</p>
        </Card>
      </div>
      <div className="col-span-8">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
      </div>
    </div>
  );
}

export default Content;
