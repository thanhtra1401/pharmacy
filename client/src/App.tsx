import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout></MainLayout>}></Route>
      </Routes>
    </div>
  );
}

export default App;
