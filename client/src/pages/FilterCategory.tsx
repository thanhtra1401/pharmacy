import {
  Link,
  createSearchParams,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getProductsApi } from "../apis/productApi";
import { useEffect, useState } from "react";
import {
  Category,
  PaginationResponse,
  Product,
} from "../interfaces/productInterface";
import Loading from "../components/Common/Loading";
import { getCategoryBySlugApi } from "../apis/categoryApi";
import { Pagination, Radio } from "antd";
import useQueryParams from "../hooks/useQueryPrams";
import ProductItem from "../components/Product/ProductItem";

function FilterCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [cat, setCat] = useState<Category>();
  const navigate = useNavigate();
  const queryParams = useQueryParams();

  const [valueFilter, setValueFilter] = useState(0);
  const { page, size, sort_by, order } = queryParams;

  const [paginationData, setPaginationData] = useState<PaginationResponse>();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const responseGetCat = await getCategoryBySlugApi(category || "");
      if (responseGetCat.status === 200) {
        setCat(responseGetCat.data.category);

        if (responseGetCat.data.category.children.length > 0) {
          const response = await getProductsApi({
            ...queryParams,
            parentCatSlug: category,
          });
          setTimeout(() => {
            if (response.status === 200) {
              setProducts(response.data.data.products);
              setPaginationData({
                totalItems: response.data.data.totalItems,
                currentPage: response.data.data.currentPage,
                totalPages: response.data.data.totalPages,
              });
              setLoading(false);
            }
          }, 400);
        } else {
          const response = await getProductsApi({
            ...queryParams,
            slugCat: category,
          });
          setTimeout(() => {
            if (response.status === 200) {
              setProducts(response.data.data.products);
              setPaginationData({
                totalItems: response.data.data.totalItems,
                currentPage: response.data.data.currentPage,
                totalPages: response.data.data.totalPages,
              });
              setLoading(false);
            }
          }, 400);
        }
      }
    };

    getProducts();
  }, [category, page, size, sort_by, order]);
  if (loading) return <Loading />;

  return (
    <div className="bg-[#f0f1f3] pb-4">
      <div className="container pt-4">
        <Link to="/" className="text-primary text-sm">
          Trang chủ
        </Link>
        {cat?.parent && (
          <>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/${cat.parent.slug}`} className="text-primary text-sm">
              {cat.parent.name}
            </Link>
          </>
        )}
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-sm">{cat?.name}</span>
      </div>
      {cat && cat?.children.length > 0 && (
        <div className="container grid grid-cols-12 mt-4 gap-2">
          {cat.children.map((item) => (
            <Link
              to={`/${item.slug}`}
              className="col-span-2 bg-white px-4 py-2 rounded-lg hover:text-primary"
            >
              {" "}
              {item.name}
            </Link>
          ))}
        </div>
      )}

      <div className=" container flex justify-between items-center">
        <div className="text-xl mt-4 font-medium">Danh sách sản phẩm</div>
        <div>
          <span className="mx-4">Sắp xếp theo</span>
          <Radio.Group
            buttonStyle="solid"
            value={valueFilter}
            onChange={(e) => {
              setValueFilter(e.target.value);
            }}
          >
            <Radio.Button
              value={0}
              onClick={() =>
                navigate({
                  pathname: `/${cat?.slug}`,
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
                  pathname: `/${cat?.slug}`,
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
                  pathname: `/${cat?.slug}`,
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
      <div className="grid grid-cols-12 gap-2 mt-4 container">
        {products.map((product) => (
          <div key={product.id} className="col-span-2">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          total={paginationData?.totalItems}
          defaultCurrent={paginationData?.currentPage || 1}
          defaultPageSize={12}
          onChange={(page, pageSize) => {
            navigate({
              pathname: `/${cat?.slug}`,
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
  );
}

export default FilterCategory;
