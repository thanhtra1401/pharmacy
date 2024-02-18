import { useEffect, useState } from "react";
import ProductItem from "../components/Product/ProductItem";

import { PaginationResponse, Product } from "../interfaces/productInterface";
import { getProductsApi } from "../apis/productApi";
import SliderNavMain from "../components/Slider/SliderNavMain";
import { Pagination } from "antd";
import { createSearchParams, useNavigate } from "react-router-dom";
import useQueryParams from "../hooks/useQueryPrams";
//import useQueryParams from "../hooks/useQueryPrams";

function Home() {
  const queryParams = useQueryParams();
  const { page, size } = queryParams;

  const [paginationData, setPaginationData] = useState<PaginationResponse>();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProductList = async () => {
      const response = await getProductsApi({
        page: page || 1,
        size: size || 12,
        sort_by: "sold",
        order: "asc",
      });
      if (response.status === 200) {
        setProducts(response.data.data.products);
        setPaginationData({
          totalItems: response.data.data.totalItems,
          currentPage: response.data.data.currentPage,
          totalPages: response.data.data.totalPages,
        });
      }
    };
    getProductList();
  }, [page, size]);
  return (
    <div>
      <SliderNavMain />

      <div className="bg-[#f7ecdd] py-6 relative">
        <div className="container ">
          <div className="absolute top-[-10px] right-[50%] translate-x-[50%]">
            <img
              src="https://nhathuoclongchau.com.vn/static/images/san-pham-ban-chay.svg"
              alt="img"
            />
          </div>
          <div className="absolute top-[-8px] right-[50%] translate-x-[50%] text-white font-medium ">
            Sản phẩm bán chạy
          </div>
          <div className="grid grid-cols-12 mt-4 gap-2">
            {products.map((product) => (
              <div key={product.id} className="col-span-2">
                <ProductItem product={product} />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Pagination
              total={paginationData?.totalItems}
              defaultCurrent={1}
              defaultPageSize={12}
              onChange={(page, pageSize) => {
                navigate({
                  pathname: "/",
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
      </div>
    </div>
  );
}

export default Home;
