import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/function";
import { Skeleton, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { productStore } from "../store/store";
import { getProductApi } from "../apis/productApi";
import { Product as ProductType } from "../interfaces/productInterface";
import { addToCartApi, updateCartApi } from "../apis/cartApi";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const getText = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent;
};
function Product() {
  const { id } = useParams();

  const cart_id = productStore((state) => state.cart_id);
  const [product, setProduct] = useState<ProductType>({
    id: -1,
    name: "",
    slug: "",
    shortDes: "",
    description: "",
    priceWithDiscount: -1,
    price: -1,
    amount: 1,
    intendedUse: "",
    country: "",
    howToUse: "",
    ingredient: "",
    sideEffects: "",
    origin: "",
    lotNumber: 1,
    manufactureDate: new Date(),
    expiriedDate: new Date(),
    unit: "",
    images: [],
    Category: {
      name: "",
    },
    discountList: [
      {
        minAmount: 0,
        maxAmount: 0,
        active: false,
        discountProgram: {
          id: 0,
          discountPercent: 0,
          startAt: new Date(),
          endAt: new Date(),
        },
      },
    ],
    categoryId: 1,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const getProductInfo = async () => {
        const response = await getProductApi(parseInt(id));
        if (response.status === 200) {
          setProduct(response.data.data.product);
          setLoading(false);
        }
      };
      getProductInfo();
    }
  }, [id]);

  const discountUsed =
    product?.discountList && product.discountList.length > 0
      ? product.discountList.find(
          (item) =>
            item.active &&
            new Date(item.discountProgram.endAt) > new Date() &&
            new Date(item.discountProgram.startAt) <= new Date()
        )
      : null;

  const [amount, setAmount] = useState(1);
  const setAmountProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };
  const increaseAmount = () => {
    setAmount(amount + 1);
  };
  const decreaseAmount = () => {
    if (amount > 1) setAmount(amount - 1);
  };

  const addCart = async () => {
    const response = await addToCartApi({
      productId: id ? parseInt(id) : -1,
      cartId: cart_id,
      amount: amount,
    });
    const responseUpdateCart = await updateCartApi(cart_id);

    if (response.status === 200 && responseUpdateCart.status === 200)
      Swal.fire({
        icon: "success",
        text: "Đã thêm vào giỏ hàng",
      });
  };
  if (loading)
    return (
      <div className="h-lvh w-full container">
        <Skeleton active />
        <Skeleton active className="mt-4" />
        <Skeleton active className="mt-4" />
        <Skeleton active className="mt-4" />
      </div>
    );
  else {
    return (
      <div className="bg-[#f0f1f3] pt-6 pb-6">
        <div className="container">
          <div className="grid grid-cols-12 bg-white py-4 px-10 rounded-lg ">
            <div className="col-span-5">
              <div className="">
                <img
                  src={product.image}
                  alt="img"
                  className="w-full h-[400px] p-10 "
                />
              </div>
              {/* <Carousel className="outline-none">
                {product.images.length !== 0 &&
                  product.images.map((image) => (
                    <div className="">
                      <img
                        src={image.url}
                        alt="img"
                        className="w-full h-[400px] p-10 "
                      />
                    </div>
                  ))}
              </Carousel> */}

              {/* <img
                  src={product?.images.length !== 0 ? product?.images[0].url : ""}
                  alt="img"
                  className="w-full p-16"
                /> */}
            </div>
            <div className="col-span-7">
              <div className="text-2xl font-medium">{product?.name}</div>
              <div className=" text-gray-500 mt-4">Mã: {product?.id}</div>
              <div className="text-primary  mt-4">
                <span className="text-3xl font-medium">
                  {formatCurrency(
                    discountUsed ? product.priceWithDiscount : product.price
                  )}
                  đ
                </span>
                <span className="text-2xl"> / {product?.unit}</span>
              </div>
              <div className="flex mt-4 ">
                <div className="w-1/4 text-gray-700">Đơn vị</div>
                <div className="w-3/4">{product.unit}</div>
              </div>
              <div className="flex mt-4 ">
                <div className="w-1/4 text-gray-700">Danh mục</div>
                <div className="w-3/4">
                  {product?.Category && product.Category.name}
                </div>
              </div>

              <div className="flex mt-4 ">
                <div className="w-1/4 text-gray-700">Nhà sản xuất</div>
                <div className="w-3/4">{product?.origin}</div>
              </div>
              <div className="flex mt-4 ">
                <div className="w-1/4 text-gray-700">Xuất xứ</div>
                <div className="w-3/4">{product?.country}</div>
              </div>

              <div className="flex mt-4 ">
                <div className="w-1/4 text-gray-700">Thành phần</div>
                <div className="w-3/4">
                  Xuyên tâm liên, Thanh hao hoa vàng, Cúc hoa, Acerola, Kẽm
                  Gluconat, Pelargonium Graveolens (Geranium) Flower Oil, Gừng,
                  Cam thảo
                </div>
              </div>
              <div className="flex mt-4 border-b-[1px] border-gray-300 pb-6">
                <div className="w-1/4 text-gray-700">Mô tả ngắn</div>
                <div className="w-3/4">{product?.shortDes}</div>
              </div>
              <div className="flex mt-4 ">
                <div className="w-1/4 text-gray-700">Chọn số lượng</div>

                <div className="w-3/4 text-center text-sm font-medium flex  items-center">
                  <div
                    className={`py-1 px-3 rounded-l-2xl border-[1px] border-gray-400 cursor-pointer ${
                      amount === 1 && "opacity-50 cursor-text"
                    }`}
                    onClick={decreaseAmount}
                  >
                    -
                  </div>
                  <input
                    type="number"
                    className="py-1 px-2 outline-none w-12 border-y-[1px] border-gray-400 text-center "
                    min={1}
                    defaultValue={1}
                    value={amount}
                    onChange={setAmountProduct}
                  />
                  <div
                    className="py-1 px-3 rounded-r-2xl border-[1px] border-gray-400 cursor-pointer"
                    onClick={increaseAmount}
                  >
                    +
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="bg-primary py-3 px-20 text-white rounded-full text-lg"
                  onClick={addCart}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-white p-4 rounded-lg mt-6">
            <Tabs
              tabPosition="left"
              defaultActiveKey="1"
              className="w-full bg-white mt-4"
            >
              <TabPane tab={<div className="w-full pr-8 ">Mô tả</div>} key="1">
                <div>
                  <div className="mb-2 text-lg font-medium">Mô tả sản phẩm</div>
                  <p>{getText(product.description)}</p>
                </div>
              </TabPane>
              <TabPane
                tab={<div className="w-full pr-8">Thành phần</div>}
                key="2"
              >
                <div className="mb-2 text-lg font-medium">Thành phần</div>
                {product.ingredient}
              </TabPane>
              <TabPane
                tab={<div className="w-full pr-8">Công dụng</div>}
                key="3"
              >
                <div className="mb-2 text-lg font-medium">Công dụng</div>
                {product?.intendedUse}
              </TabPane>
              <TabPane
                tab={<div className="w-full pr-8">Cách dùng</div>}
                key="4"
              >
                <div className="mb-2 text-lg font-medium">Cách dùng</div>
                {product?.howToUse}
              </TabPane>
              <TabPane
                tab={<div className="w-full pr-8">Tác dụng phụ</div>}
                key="5"
              >
                <div className="mb-2 text-lg font-medium">Tác dụng phụ</div>
                {product?.sideEffects}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
