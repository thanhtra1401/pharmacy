import MyFooter from "../components/Footer/Footer";
import MainHeader from "../components/Headers/MainHeader";
import Navigation from "../components/Menu/Navigation";
interface ChildrenProps {
  children?: JSX.Element;
}

function MainLayout({ children }: ChildrenProps) {
  return (
    <div>
      <MainHeader />

      <Navigation />

      {children}
      <MyFooter />
    </div>
  );
}

export default MainLayout;
