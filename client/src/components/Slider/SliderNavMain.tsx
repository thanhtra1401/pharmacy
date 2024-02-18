import { Link, useNavigate } from "react-router-dom";
import Slider from "./Slider";

function SliderNavMain() {
  const navigate = useNavigate();
  return (
    <div className=" bg-[#f0f1f3] pt-4 pb-6 ">
      <div className=" container">
        <div className="grid grid-cols-12">
          <div className="col-span-8">
            <Slider />
          </div>
          <div className="col-span-4  ">
            <div className="ml-4 flex flex-col justify-between h-full">
              <img
                src="https://cdn.nhathuoclongchau.com.vn/unsafe/391x120/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/banner_web_782x240_01_01_522295d1d0.jpg"
                alt="bai-viet"
                className="rounded-lg"
              />
              <div className="flex justify-between items-center  ">
                <div
                  className=" bg-white flex-1 mr-2 h-28 rounded-xl flex items-center justify-center flex-col cursor-pointer"
                  onClick={() => navigate("don-thuoc")}
                >
                  <img
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/40x40/https://cms-prod.s3-sgn09.fptcloud.com/smalls/can_mua_thuoc_40x40_3x_59367d7177.png"
                    alt="icon"
                  />
                  <span>Cần mua thuốc</span>
                </div>
                <div className=" bg-white flex-1 mr-2 h-28 rounded-xl flex items-center justify-center flex-col cursor-pointer">
                  <img
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/40x40/https://cms-prod.s3-sgn09.fptcloud.com/smalls/tu_van_voi_duoc_sy_40x40_3x_aaa988a1a2.png"
                    alt="icon"
                  />
                  <span className="text-center">Tư vấn sức khỏe</span>
                </div>
                <Link
                  to="https://www.google.com/maps/place/C%E1%BB%95ng+Tr%E1%BA%A7n+%C4%90%E1%BA%A1i+Ngh%C4%A9a+-+%C4%90%E1%BA%A1i+H%E1%BB%8Dc+B%C3%A1ch+Khoa+H%C3%A0+N%E1%BB%99i/@21.0039991,105.8406128,16.48z/data=!4m14!1m7!3m6!1s0x3135ac76ec11422d:0x2791469add0b8b05!2zxJDDoG8gdOG6oW8gUXXhu5FjIHThur8gKFNJRSkgLSBUcsaw4budbmcgxJDhuqFpIGjhu41jIELDoWNoIEtob2EgSMOgIE7hu5lp!8m2!3d21.004034!4d105.844867!16s%2Fg%2F1td7ksgl!3m5!1s0x3135ad5569f4fbf1:0x5bf30cadcd91e2c3!8m2!3d21.0050373!4d105.8456577!16s%2Fg%2F11gj1c9sk3?hl=vi-VN&entry=ttu"
                  className=" bg-white flex-1 mr-2 h-28 rounded-xl flex items-center justify-center flex-col cursor-pointer"
                >
                  <img
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/40x40/https://cms-prod.s3-sgn09.fptcloud.com/smalls/tim_nha_thuoc_gan_day_40x40_3x_a116d4c818.png"
                    alt="icon"
                  />
                  <span>Tìm nhà thuốc</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SliderNavMain;
