import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { getDiscountsApi } from "../../apis/discountApi";
import { useNavigate } from "react-router-dom";
import { Discount } from "../../interfaces/discountInterface";
function Slider() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const getDiscounts = async () => {
    const response = await getDiscountsApi({ valid: true });
    if (response.status === 200) {
      setDiscounts(response.data.data.discounts);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    getDiscounts();
  }, []);
  return (
    <Carousel speed={1000}>
      {discounts.length > 0 &&
        discounts.map((discount) => (
          <div
            className="rounded-xl outline-none cursor-pointer"
            onClick={() => navigate(`/khuyen-mai/${discount.id}`)}
          >
            <img
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/banner_web_pc_1610x492_7fad510c4d.jpg"
              alt="Hình ảnh 1"
              className="h-full rounded-xl"
            />
          </div>
        ))}
    </Carousel>
  );
}

export default Slider;
