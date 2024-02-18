import { Layout } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const MyFooter = () => {
  return (
    <Footer className="bg-gray-100 p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Về Chúng Tôi</h4>
            <p>
              Chúng tôi cam kết cung cấp các sản phẩm chất lượng nhất cho sức
              khỏe của bạn.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên Hệ</h4>
            <p>
              Địa chỉ: 123 Đường ABC, quận Hai Bà Trưng, Hà Nội
              <br />
              Điện thoại: 0123 456 789
              <br />
              Email: nhathuoc@gmail.com
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Theo Dõi Chúng Tôi</h4>
            <div>
              <a href="#" className="mr-4">
                <FacebookOutlined style={{ fontSize: "24px" }} />
              </a>
              <a href="#" className="mr-4">
                <TwitterOutlined style={{ fontSize: "24px" }} />
              </a>
              <a href="#" className="mr-4">
                <InstagramOutlined style={{ fontSize: "24px" }} />
              </a>
              <a href="#">
                <LinkedinOutlined style={{ fontSize: "24px" }} />
              </a>
            </div>
          </div>
        </div>
        <hr className="my-8" />
        <p className="text-center text-gray-600">
          © 2024. Tất cả các quyền được bảo lưu.
        </p>
      </div>
    </Footer>
  );
};

export default MyFooter;
