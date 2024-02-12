import { TreeSelect } from "antd";
import { useEffect, useState } from "react";
import { getCategoriesApi } from "../../apis/categoryApi";

import PropTypes from "prop-types";

SelectCategory.propTypes = {
  category: PropTypes.number,
  setCategory: PropTypes.func,
};
function SelectCategory({ category, setCategory }) {
  const [categories, setCategories] = useState([]);

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
    value: category.id,
    children: category.children.map((item) => ({
      title: item.name,
      value: item.id,
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
    </div>
  );
}

export default SelectCategory;
