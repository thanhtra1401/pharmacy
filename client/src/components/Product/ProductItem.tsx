import { Card } from "antd";
import { formatCurrency } from "../../utils/function";

function ProductItem() {
  return (
    <Card
      bodyStyle={{ padding: "16px" }}
      hoverable
      cover={
        <img
          className="px-6 pt-4"
          alt="example"
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/128x128/https://cms-prod.s3-sgn09.fptcloud.com/00032568_phe_khang_hai_thuong_vuong_3x10_7009_616f_large_12889d8d3b.jpg"
        />
      }
      className="relative rounded-xl"
    >
      <div>
        <div className="h-16 line-clamp-3 font-medium">
          Viên uống Phế Khang Hải Thượng Vương Vesta hỗ trợ giảm đau rát họng,
          khản tiếng do ho kéo dài (30 viên)
        </div>
        <div className="mt-3 text-primary">
          <span className="font-medium">{formatCurrency(5000000)}đ</span>
          <span className="text-sm"> / Hộp</span>
        </div>
        <div className="line-through text-xs">{formatCurrency(6000000)}đ</div>
        <div className="rounded-3xl whitespace-nowrap bg-gray-300 mt-6 w-min px-2 py-[0.5px] text-xs  ">
          Hộp 30 viên
        </div>
      </div>

      <div className="w-min h-min bg-red-500 px-2 py-1 rounded-tl-xl rounded-br-xl text-white font-medium top-0 left-0 absolute ">
        -20%
      </div>
    </Card>
  );
}

export default ProductItem;
