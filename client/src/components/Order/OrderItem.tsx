import { Button } from "antd";
import { formatCurrency } from "../../utils/function";

function OrderItem({ status }: { status: number }) {
  return (
    <div className="w-full bg-white mt-4 ">
      <div className="flex justify-between py-3 items-center border-b-2 border-gray-300 ">
        <div className="flex">
          <div className="mx-4 font-medium">Đơn hàng 20/08/2023</div>
          <div className="text-gray-600">#1234</div>
        </div>

        {status === 0 && (
          <div className="text-[#4caf50] flex items-center">
            <i className="fa-solid fa-circle text-[8px]"></i>
            <span className="mr-4 ml-2">Đã giao</span>
          </div>
        )}
        {status === 1 && (
          <div className="text-[#ff9800] flex items-center">
            <i className="fa-solid fa-circle text-[8px]"></i>
            <span className="mr-4 ml-2">Đang xử lý</span>
          </div>
        )}
        {status === 2 && (
          <div className="text-[#64b5f6] flex items-center">
            <i className="fa-solid fa-circle text-[8px]"></i>
            <span className="mr-4 ml-2">Đang giao</span>
          </div>
        )}
      </div>
      <div className="flex mt-4 items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://cdn.nhathuoclongchau.com.vn/unsafe/50x50/https://cms-prod.s3-sgn09.fptcloud.com/00005427_nuoc_suc_mieng_t_b_1058_62bc_large_55a1ddba21.jpg"
            alt="img"
            className="w-18 h-18 rounded-lg border-[1px] p-2 mx-4"
          />
          <span className="font-medium uppercase">TB-Traphaco 500ml</span>
        </div>
        <div className="flex">
          <span className="font-medium">{formatCurrency(180000)}</span>
          <span className="mx-4">x1 Chai</span>
        </div>
      </div>
      <div className="flex items-center justify-between py-4 border-b-2 border-gray-300">
        <div className="flex items-center text-primary cursor-pointer">
          <div className="ml-4 mr-2">Xem chi tiết</div>
          <i className="fa-solid fa-chevron-right text-xs leading-none"></i>
        </div>
        <div className="mx-4">
          Thành tiền:{" "}
          <span className="text-primary font-medium ">
            {formatCurrency(180000)}
          </span>
        </div>
      </div>
      <div className="flex  py-4 items-center justify-end ">
        <Button type="primary" className="bg-primary mx-4" shape="round">
          <div className="px-4">Mua lại</div>
        </Button>
      </div>
    </div>
  );
}

export default OrderItem;
