import { getProductsApi } from "../apis/productApi";
import { useEffect, useState } from "react";
import { Pagination, Radio } from "antd";
import ProductItem from "../components/Product/ProductItem";
import { PaginationResponse, Product } from "../interfaces/productInterface";
import useQueryParams from "../hooks/useQueryPrams";
import { createSearchParams, useNavigate } from "react-router-dom";
import Loading from "../components/Common/Loading";

function SearchResult() {
  const navigate = useNavigate();
  const queryParams = useQueryParams();
  const { page, size, name, sort_by, order } = queryParams;
  const [paginationData, setPaginationData] = useState<PaginationResponse>();
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProductsSearch = async () => {
      const response = await getProductsApi(queryParams);

      if (response.status === 200) {
        setTimeout(() => {
          setProducts(response.data.data.products);
          setPaginationData({
            totalItems: response.data.data.totalItems,
            currentPage: response.data.data.currentPage,
            totalPages: response.data.data.totalPages,
          });
          setLoading(false);
        }, 400);
      }
    };
    getProductsSearch();
  }, [page, size, name, sort_by, order]);
  if (loading) return <Loading />;

  return (
    <div className="bg-[#f0f1f3] py-4">
      <div className="container">
        <div className="bg-white p-4 rounded-lg">
          <div>
            <Radio.Group defaultValue={1}>
              <Radio value={1}>Sản phẩm</Radio>
              <Radio value={2}>Bài viết sức khỏe</Radio>
            </Radio.Group>
          </div>
          <div className="mt-4">
            Tìm thấy{" "}
            <span className="font-medium">{paginationData?.totalItems}</span>{" "}
            sản phẩm với từ khóa <span className="font-medium">"{name}"</span>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-xl font-medium ">Danh sách sản phẩm</div>
            <div>
              <span className="mx-4">Sắp xếp theo</span>
              <Radio.Group defaultValue={0} buttonStyle="solid">
                <Radio.Button
                  value={0}
                  onClick={() =>
                    navigate({
                      pathname: "/tim-kiem",
                      search: createSearchParams({
                        ...queryParams,
                        sort_by: "sold",
                        order: "desc",
                      }).toString(),
                    })
                  }
                >
                  Bán chạy
                </Radio.Button>
                <Radio.Button
                  value={1}
                  onClick={() =>
                    navigate({
                      pathname: "/tim-kiem",
                      search: createSearchParams({
                        ...queryParams,
                        sort_by: "price",
                        order: "asc",
                      }).toString(),
                    })
                  }
                >
                  Giá thấp
                </Radio.Button>
                <Radio.Button
                  value={2}
                  onClick={() =>
                    navigate({
                      pathname: "/tim-kiem",
                      search: createSearchParams({
                        ...queryParams,
                        sort_by: "price",
                        order: "desc",
                      }).toString(),
                    })
                  }
                >
                  Giá cao
                </Radio.Button>
              </Radio.Group>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-4 gap-2">
            {products.map((product) => (
              <div key={product.id} className="col-span-2 ">
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
                  pathname: "/tim-kiem",
                  search: createSearchParams({
                    ...queryParams,
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

export default SearchResult;
