import Header from "./components/Header/Header";
import SideMenu from "./components/Menu/SideMenu";
import PageContent from "./components/PageContent/PageContent";

function App() {
  return (
    <div className="">
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
  );
}

export default App;
