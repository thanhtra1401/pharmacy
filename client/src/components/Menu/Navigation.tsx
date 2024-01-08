import { Menu } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import { getCategory } from "../../apis/categoryApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertSlug } from "../../utils/function";

interface Category {
  id: number;
  name: string;
  description: string;
  parentId: number;
}
interface CategoryRes {
  id: number;
  name: string;
  description: string;
  parentId: number;
  children: Category[];
}

function Navigation() {
  const [categories, setCategories] = useState<CategoryRes[]>([]);
  const getCategoryNav = async () => {
    try {
      const response = await getCategory();
      setCategories(response.data.categories);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getCategoryNav();
  }, []);
  console.log(categories);
  return (
    <div className="container">
      <Menu mode="horizontal" className="w-full">
        {categories.length !== 0 &&
          categories.map((category) => (
            <SubMenu
              key={category.id}
              title={
                <Link
                  to={convertSlug(category.name)}
                  className="hover:text-current"
                >
                  {category.name}
                </Link>
              }
            >
              {category.children.map((item) => (
                <Menu.Item key={item.id}>
                  <Link to={convertSlug(item.name)}>{item.name}</Link>
                </Menu.Item>
              ))}
            </SubMenu>
          ))}
      </Menu>
    </div>
  );
}

export default Navigation;
