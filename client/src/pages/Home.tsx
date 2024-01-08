import ProductItem from "../components/Product/ProductItem";
import Slider from "../components/Slider/Slider";

function Home() {
  return (
    <div>
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
                  <div className=" bg-white flex-1 mr-2 h-28 rounded-xl flex items-center justify-center flex-col cursor-pointer">
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
                  <div className=" bg-white flex-1 mr-2 h-28 rounded-xl flex items-center justify-center flex-col cursor-pointer">
                    <img
                      src="https://cdn.nhathuoclongchau.com.vn/unsafe/40x40/https://cms-prod.s3-sgn09.fptcloud.com/smalls/tim_nha_thuoc_gan_day_40x40_3x_a116d4c818.png"
                      alt="icon"
                    />
                    <span>Tìm nhà thuốc</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f7ecdd] py-6">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-2 mr-2">
              <ProductItem />
            </div>
            <div className="col-span-2 mx-2">
              <ProductItem />
            </div>
            <div className="col-span-2 mx-2">
              <ProductItem />
            </div>
            <div className="col-span-2 mx-2">
              <ProductItem />
            </div>
            <div className="col-span-2 mx-2">
              <ProductItem />
            </div>
            <div className="col-span-2 ml-2">
              <ProductItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
