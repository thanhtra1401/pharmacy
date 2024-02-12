import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import AuthProtected from "./components/Auth/AuthProtected";
import ProfileUpdate from "./pages/ProfileUpdate";
import Order from "./pages/Order";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Cart from "./pages/Cart";
import Buy from "./pages/Buy";
import Product from "./pages/Product";
import OrderDetail from "./pages/OrderDetail";
import Address from "./pages/Address";
import FilterCategory from "./pages/FilterCategory";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/:category"
          element={
            <MainLayout>
              <FilterCategory />
            </MainLayout>
          }
        ></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route
          path="/forgot-password/:token"
          element={<ForgotPassword />}
        ></Route>
        <Route path="" element={<AuthProtected />}>
          <Route
            path="/thong-tin-ca-nhan"
            element={
              <MainLayout>
                <Profile />
              </MainLayout>
            }
          ></Route>
        </Route>
        <Route path="" element={<AuthProtected />}>
          <Route
            path="/thong-tin-ca-nhan/chinh-sua"
            element={
              <MainLayout>
                <ProfileUpdate />
              </MainLayout>
            }
          ></Route>
        </Route>
        <Route path="" element={<AuthProtected />}>
          <Route
            path="/thong-tin-ca-nhan/don-hang"
            element={
              <MainLayout>
                <Order />
              </MainLayout>
            }
          ></Route>
        </Route>
        <Route path="" element={<AuthProtected />}>
          <Route
            path="/thong-tin-ca-nhan/don-hang/:id"
            element={
              <MainLayout>
                <OrderDetail />
              </MainLayout>
            }
          ></Route>
        </Route>
        <Route path="" element={<AuthProtected />}>
          <Route
            path="/ca-nhan/quan-ly-dia-chi"
            element={
              <MainLayout>
                <Address />
              </MainLayout>
            }
          ></Route>
        </Route>

        <Route
          path="/tim-kiem"
          element={
            <MainLayout>
              <SearchResult />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/gio-hang"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/mua-hang"
          element={
            <MainLayout>
              <Buy />
            </MainLayout>
          }
        ></Route>

        <Route
          path="/san-pham/:id"
          element={
            <MainLayout>
              <Product />
            </MainLayout>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
