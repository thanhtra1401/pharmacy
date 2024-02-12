import { Card } from "antd";
import { formatCurrency } from "../../utils/function";
import { Product } from "../../interfaces/productInterface";
import { useNavigate } from "react-router-dom";
import { productStore } from "../../store/store";

function ProductItem({ product }: { product: Product }) {
  const setProductId = productStore((state) => state.setProductId);
  const navigate = useNavigate();

  const discountUsed =
    product?.discountList && product.discountList.length > 0
      ? product.discountList.find(
          (item) =>
            item.active &&
            new Date(item.discountProgram.endAt) > new Date() &&
            new Date(item.discountProgram.startAt) <= new Date()
        )
      : null;

  return (
    <Card
      bodyStyle={{ padding: "16px" }}
      hoverable
      cover={
        <img
          className="px-6 pt-4 h-[180px]"
          alt="example"
          src={product.image}
        />
      }
      className="relative rounded-xl"
      onClick={() => {
        navigate(`/san-pham/${product.id}`);
        setProductId(product.id);
      }}
    >
      <div>
        <div className="h-16 line-clamp-3 font-medium">{product.name}</div>
        <div className="mt-3 text-primary">
          {discountUsed ? (
            <span className="font-medium">
              {formatCurrency(product.priceWithDiscount)}đ
            </span>
          ) : (
            <span className="font-medium">
              {formatCurrency(product.price)}đ
            </span>
          )}
          <span className="text-sm"> / {product.unit}</span>
        </div>

        <div
          className={`line-through text-xs ${!discountUsed && "invisible"} `}
        >
          {formatCurrency(product.price)}đ
        </div>

        <div className="rounded-3xl whitespace-nowrap bg-gray-300 mt-6 w-min px-2 py-[0.5px] text-xs  ">
          {product.unit}
        </div>
      </div>
      {discountUsed && (
        <div className="w-min h-min bg-red-500 px-2 py-1 rounded-tl-xl rounded-br-xl text-white font-medium top-0 left-0 absolute ">
          -{discountUsed.discountProgram.discountPercent}%
        </div>
      )}
    </Card>
  );
}

export default ProductItem;
