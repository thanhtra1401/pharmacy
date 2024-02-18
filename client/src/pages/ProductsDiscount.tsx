import { useEffect, useState } from "react";
import { PaginationResponse } from "../interfaces/productInterface";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { getDiscountDetailApi } from "../apis/discountApi";
import { DiscountDetailProduct } from "../interfaces/discountInterface";
import Loading from "../components/Common/Loading";
import ProductItem from "../components/Product/ProductItem";
import useQueryParams from "../hooks/useQueryPrams";
import { Pagination } from "antd";
import moment from "moment";
import "moment/locale/vi";

// console.log(moment.locale());
// import moment from "moment";
// import vi from "moment/locale/vi";
moment.locale("vi");

function ProductsDiscount() {
  const navigate = useNavigate();
  const queryParams = useQueryParams();

  const { page, size } = queryParams;
  const { discountId } = useParams();
  const [discountDetails, setDiscountDetails] = useState<
    DiscountDetailProduct[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [paginationData, setPaginationData] = useState<PaginationResponse>();

  useEffect(() => {
    const getDiscountDetails = async () => {
      const response = await getDiscountDetailApi(discountId, {
        page: page || 1,
        size: size || 6,
      });
      if (response.status === 200) {
        setTimeout(() => {
          setDiscountDetails(response.data.data.discountDetails);
          setPaginationData({
            totalItems: response.data.data.totalItems,
            currentPage: response.data.data.currentPage,
            totalPages: response.data.data.totalPages,
          });

          setLoading(false);
        }, 400);
      }
    };
    getDiscountDetails();
  }, [discountId, page, size]);

  if (loading) return <Loading />;
  return (
    <div className="container">
      {discountDetails.length > 0 && (
        <div className="mt-4 ">
          <div className="text-lg font-medium text-primary">
            Chương trình khuyến mại {discountDetails[0].discountProgram.name}
          </div>
          <div className="mt-2">
            <span>Thời gian bắt đầu: </span>
            <span>
              {moment(discountDetails[0].discountProgram.startAt).format(
                "dddd, LL LT"
              )}
            </span>
          </div>
          <div>
            <span>Thời gian kết thúc: </span>
            <span>
              {moment(discountDetails[0].discountProgram.endAt).format(
                "dddd, LL LT"
              )}
            </span>
          </div>
          <div className="text-lg font-medium mt-4">Danh sách sản phẩm</div>
          <div className="grid grid-cols-12 mt-4 gap-2">
            {discountDetails.map((item) => (
              <div key={item.Product.id} className="col-span-2">
                <ProductItem product={item.Product} />
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Pagination
              total={paginationData?.totalItems}
              defaultCurrent={1}
              defaultPageSize={6}
              onChange={(page, pageSize) => {
                navigate({
                  pathname: `/khuyen-mai/${discountId}`,
                  search: createSearchParams({
                    page: page.toString(),
                    size: pageSize.toString(),
                  }).toString(),
                });
              }}
              showSizeChanger={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsDiscount;
