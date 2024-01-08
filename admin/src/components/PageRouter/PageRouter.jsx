import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";

function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
    </Routes>
  );
}
export default PageRouter;
