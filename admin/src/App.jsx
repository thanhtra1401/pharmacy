import Header from "./components/Header/Header";
import SideMenu from "./components/Menu/SideMenu";
import PageContent from "./components/PageContent/PageContent";
import Login from "./pages/Login";
import { authStore } from "./stores/authStore";

function App() {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  return (
    <div className="">
      {isAuthenticated ? (
        <div>
          <Header />
          <div className="grid grid-cols-12 mx-8">
            <div className="col-span-2">
              <SideMenu />
            </div>
            <div className="col-span-10">
              <PageContent />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Header />
          <Login></Login>
        </div>
      )}
    </div>
  );
}

export default App;
