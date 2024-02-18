import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Order from "../../pages/Order";
import OrderDetail from "../../pages/OrderDetail";
import CustomerDetail from "../../pages/CustomerDetail";
import AllProducts from "../../pages/AllProducts";
import ProductDetail from "../../pages/ProductDetail";
import Product from "../../pages/Product";
import AddProduct from "../../pages/AddProduct";
import Customer from "../../pages/Customer";
import Discount from "../../pages/Discount";
import AllDiscounts from "../../pages/AllDiscounts";
import DiscountDetail from "../../pages/DiscountDetail";
import AddDiscount from "../../pages/AddDiscount";
import ApplyDiscount from "../../pages/ApplyDiscount";
import ApplyDiscountList from "../../pages/ApplyDiscountList";
import Category from "../../pages/Category";
import AllCategory from "../../pages/AllCategory";
import AddCategory from "../../pages/AddCategory";
import AddChildCategory from "../../pages/AddChildCategory";
import CategoryDetail from "../../pages/CategoryDetail";
import ApplyDiscountForProduct from "../../pages/ApplyDiscountForProduct";
import ProductExpiration from "../../pages/ProductExpiration";

function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/don-hang" element={<Order />}></Route>
      <Route
        path="/don-hang/chi-tiet-don-hang/:id"
        element={<OrderDetail />}
      ></Route>
      <Route path="/khach-hang" element={<Customer />}></Route>
      <Route
        path="/khach-hang/chi-tiet-khach-hang/:id"
        element={<CustomerDetail />}
      ></Route>
      <Route path="/san-pham/tat-ca-san-pham" element={<AllProducts />}></Route>
      <Route
        path="/san-pham/chi-tiet-san-pham/:id"
        element={<ProductDetail />}
      ></Route>
      <Route path="/san-pham" element={<Product />}></Route>
      <Route
        path="/san-pham/them-moi-san-pham"
        element={<AddProduct />}
      ></Route>
      <Route
        path="/san-pham/san-pham-sap-het-han"
        element={<ProductExpiration />}
      ></Route>
      <Route path="/khuyen-mai" element={<Discount />}></Route>
      <Route
        path="/khuyen-mai/them-moi-chuong-trinh-khuyen-mai"
        element={<AddDiscount />}
      ></Route>
      <Route
        path="/khuyen-mai/tat-ca-chuong-trinh-khuyen-mai"
        element={<AllDiscounts />}
      ></Route>
      <Route path="/khuyen-mai/ap-dung" element={<ApplyDiscountList />}></Route>
      <Route
        path="/khuyen-mai/ap-dung/:discountId"
        element={<ApplyDiscount />}
      ></Route>
      <Route
        path="/khuyen-mai/ap-dung/san-pham/:productId"
        element={<ApplyDiscountForProduct />}
      ></Route>
      <Route
        path="/khuyen-mai/ap-dung/chuong-trinh/:discountId"
        element={<ApplyDiscount />}
      ></Route>
      <Route
        path="/khuyen-mai/chi-tiet-chuong-trinh/:id"
        element={<DiscountDetail />}
      ></Route>

      <Route path="/danh-muc" element={<Category />}></Route>
      <Route path="/danh-muc/tat-ca-danh-muc" element={<AllCategory />}></Route>
      <Route
        path="/danh-muc/them-moi-danh-muc-cha"
        element={<AddCategory />}
      ></Route>
      <Route
        path="/danh-muc/them-moi-danh-muc-con"
        element={<AddChildCategory />}
      ></Route>
      <Route
        path="/danh-muc/chi-tiet-danh-muc/:id"
        element={<CategoryDetail />}
      ></Route>
    </Routes>
  );
}
export default PageRouter;
