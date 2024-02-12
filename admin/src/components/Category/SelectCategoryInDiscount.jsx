import { TreeSelect } from "antd";
import { useEffect, useState } from "react";
import { getCategoriesApi } from "../../apis/categoryApi";

import PropTypes from "prop-types";
import { createSearchParams, useNavigate } from "react-router-dom";
import { convertToSlug } from "../../utils/function";

SelectCategoryInDiscount.propTypes = {
  category: PropTypes.string,
  setCategory: PropTypes.func,
  setShowSelectCategory: PropTypes.func,
};
function SelectCategoryInDiscount({
  category,
  setCategory,
  setShowSelectCategory,
}) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const response = await getCategoriesApi();
      if (response.status === 200) {
        setCategories(response.data.categories);
      }
    };
    getCategories();
  }, []);
  const treeData = categories.map((category) => ({
    title: category.name,
    value: category.name,
    children: category.children.map((item) => ({
      title: item.name,
      value: item.name,
    })),
  }));

  const onChange = (newValue) => {
    setCategory(newValue);
  };
  return (
    <div>
      <TreeSelect
        style={{
          width: "50%",
        }}
        value={category}
        dropdownStyle={{
          maxHeight: 400,
          overflow: "auto",
        }}
        treeData={treeData}
        placeholder="Chọn danh mục"
        treeDefaultExpandAll
        onChange={onChange}
      />
      <div>
        <button
          className="mt-4 px-2 py-1 bg-blue-500 text-white rounded-lg"
          onClick={() => {
            navigate({
              pathname: "/khuyen-mai/ap-dung",
              search: createSearchParams({
                slugCat: convertToSlug(category),
              }).toString(),
            });
            setShowSelectCategory(false);
          }}
        >
          Chọn
        </button>
        <button
          className="mt-4 px-2 py-1 bg-red-500 text-white rounded-lg ml-10"
          onClick={() => {
            setCategory(null);
            navigate({
              pathname: "/khuyen-mai/ap-dung",
            });
            setShowSelectCategory(false);
          }}
        >
          Bỏ lọc
        </button>
      </div>
    </div>
  );
}

export default SelectCategoryInDiscount;
