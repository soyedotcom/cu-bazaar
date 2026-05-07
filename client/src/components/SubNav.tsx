import DropDownIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { subNavData } from "../data/subNavData";
import { useState } from "react";

const SubNav = () => {
  const [activeMenu, setActiveMenu] = useState<string>("Products");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("Fashion");

  const currentCategory = subNavData.find(
    (category) => category.name === activeMenu,
  );

  const currentSubcategory = currentCategory?.subcategories?.find(
    (subcat) => subcat.name === activeSubCategory,
  );

  return (
    <nav className="flex flex-col gap-6 ml-25 mr-25 mt-5 mb-5">
      <div className="flex gap-8 font-bold">
        {subNavData.map((category) => (
          <div
            key={category.name}
            onMouseEnter={() => setActiveMenu(category.name)}
            className={`flex gap-1 cursor-pointer pb-2 ${activeMenu === category.name ? "border-b-3 border-black " : "text-gray-500"}`}
          >
            <span>{category.name}</span>
            <DropDownIcon />
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {currentCategory?.subcategories?.map((subcat) => (
          <button
            key={subcat.name}
            onClick={() => setActiveSubCategory(subcat.name)}
            className={`cursor-pointer font-bold ${activeSubCategory === subcat.name ? "text-black" : "text-gray-500"}`}
          >
            <div className="flex gap-1">
              {subcat.icon}
              {subcat.name}
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col text-left gap-5 my-10">
        <div className="text-[32px] font-bold">
          {currentSubcategory?.icon}
          {activeSubCategory}
        </div>
        <div className="flex gap-5 text-sm">
          {currentSubcategory?.sections?.map((section) => (
            <button
              key={section.name}
              className="cursor-pointer hover:text-black text-gray-600"
            >
              <div>
                {section.icon} {section.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SubNav;
