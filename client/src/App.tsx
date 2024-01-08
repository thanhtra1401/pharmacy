import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import AuthProtected from "./components/Auth/AuthProtected";
import ProfileUpdate from "./pages/ProfileUpdate";
import Order from "./pages/Order";
import Home from "./pages/Home";

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
      </Routes>
    </div>
  );
}

export default App;
