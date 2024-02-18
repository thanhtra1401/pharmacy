import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import SideMenu from "./components/Menu/SideMenu";
import SideMenuPharmacist from "./components/Menu/SideMenuPharmacist";
import PageContent from "./components/PageContent/PageContent";
import Login from "./pages/Login";
import { authStore } from "./stores/authStore";
import { getLS } from "./utils/function";
import AllPrescription from "./pages/ForPharmacist/AllPrescription";
import CustomerDetail from "./pages/CustomerDetail";
import ProductDetail from "./pages/ProductDetail";
import OrderDetail from "./pages/OrderDetail";
import CategoryDetail from "./pages/CategoryDetail";
import Prescription from "./pages/ForPharmacist/Prescription";
import SuggestProduct from "./components/ForPharmacist/SuggestProduct";

function App() {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const role = getLS("role");

  if (!isAuthenticated) {
    return (
      <div>
        <Header type={""} />
        <Login></Login>
      </div>
    );
  } else if (role == 1) {
    return (
      <div className="">
        <Header type={"Admin"} />
        <div className="grid grid-cols-12 mx-8">
          <div className="col-span-2">
            <SideMenu />
          </div>
          <div className="col-span-10">
            <PageContent />
          </div>
        </div>
      </div>
    );
  } else if (role == 2) {
    return (
      <div>
        <Header type={"Dành cho dược sỹ"} />
        <div className="grid grid-cols-12 mx-8">
          <div className="col-span-2">
            <SideMenuPharmacist />
          </div>
          <div className="col-span-10">
            <Routes>
              <Route path="/don-thuoc" element={<AllPrescription />} />
              <Route
                path="/khach-hang/chi-tiet-khach-hang/:id"
                element={<CustomerDetail />}
              ></Route>
              <Route
                path="/san-pham/chi-tiet-san-pham/:id"
                element={<ProductDetail />}
              ></Route>
              <Route
                path="/don-hang/chi-tiet-don-hang/:id"
                element={<OrderDetail />}
              ></Route>
              <Route
                path="/danh-muc/chi-tiet-danh-muc/:id"
                element={<CategoryDetail />}
              ></Route>
              <Route
                path="/don-thuoc/chi-tiet-don-thuoc/:id"
                element={<Prescription />}
              ></Route>
              <Route
                path="/don-thuoc/goi-y/:prescriptionId"
                element={<SuggestProduct />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
