import MainHeader from "../components/Headers/MainHeader";
interface ChildrenProps {
  children?: JSX.Element;
}

function MainLayout({ children }: ChildrenProps) {
  return (
    <div>
      <MainHeader />
      {children}
    </div>
  );
}

export default MainLayout;
