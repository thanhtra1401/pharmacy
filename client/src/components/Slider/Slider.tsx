import { Carousel } from "antd";
function Slider() {
  return (
    <Carousel speed={1000}>
      <div className="rounded-xl outline-none">
        <img
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/banner_web_pc_1610x492_7fad510c4d.jpg"
          alt="Hình ảnh 1"
          className="h-full rounded-xl"
        />
      </div>
      <div className="rounded-xl outline-none">
        <img
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/banner_web_pc_1610x492_7fad510c4d.jpg"
          alt="Hình ảnh 2"
          className="h-full rounded-xl "
        />
      </div>
      <div className="rounded-xl outline-none">
        <img
          src="https://cdn.nhathuoclongchau.com.vn/unsafe/1080x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/banner_web_pc_1610x492_7fad510c4d.jpg"
          alt="Hình ảnh 3"
          className="h-full rounded-xl  "
        />
      </div>
    </Carousel>
  );
}

export default Slider;
