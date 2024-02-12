import { Menu } from "antd";
import { getCategoryApi } from "../../apis/categoryApi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number;
}
interface CategoryRes {
  id: number;
  name: string;
  slug: string;
  description: string;
  parentId: number;
  children: Category[];
}

function Navigation() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<CategoryRes[]>([]);

  const cat = useParams().category;

  const getCategoryNav = async () => {
    try {
      const response = await getCategoryApi();
      setCategories(response.data.categories);
    } catch (error) {
      alert(error);
    }
  };
  const items =
    categories.length !== 0
      ? categories.map((category) => ({
          key: category.id,
          label: (
            <div
              //to={`/${category.slug}`}
              onClick={() => {
                navigate(`/${category.slug}`);
              }}
              className={
                cat === category.slug ? "text-primary" : "text-gray-700"
              }
            >
              {category.name}
            </div>
          ),
          children: category.children.map((item) => ({
            key: item.id,
            label: <Link to={`/${item.slug}`}>{item.name}</Link>,
          })),
        }))
      : undefined;
  useEffect(() => {
    getCategoryNav();
  }, []);

  return (
    <div className="container">
      <Menu mode="horizontal" className="w-full flex" items={items}></Menu>
    </div>
  );
}

export default Navigation;
