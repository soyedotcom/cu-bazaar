import DropDownIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { subNavData } from "../data/subNavData";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SubNav = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "";
  const initialSubCategory = searchParams.get("subcategory") || "";
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);

  const currentCategory = subNavData.find(
    (category) => category.name === activeMenu,
  );

  return (
    <nav className="flex flex-col gap-15">
      <section className="flex flex-col gap-8 h-22">
        <div className="flex gap-10 font-bold">
          {subNavData.map((category) => (
            <section
              key={category.name}
              onMouseEnter={() => setActiveMenu(category.name)}
              className={`flex gap-2 cursor-pointer pb-2 ${activeMenu === category.name ? "border-b-3 border-black " : "text-gray-500"}`}
            >
              <div className="flex align-middle">
                <span>{category.name}</span>
                <div>
                  <DropDownIcon />
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="flex gap-8">
          {currentCategory?.subcategories?.map((subcat) => (
            <button
              key={subcat.name}
              onClick={() => {
                navigate(
                  `/shop?category=${activeMenu}&subcategory=${encodeURIComponent(subcat.name)}`,
                );
                setActiveSubCategory(subcat.name);
                setSelectedSubCategory(subcat);
              }}
              className={`cursor-pointer font-bold ${activeSubCategory === subcat.name ? "text-black" : "text-gray-500"}`}
            >
              <div className="flex gap-2">
                <div>{subcat.icon}</div>
                <div>{subcat.name}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col text-left gap-8">
        <div className="text-[32px] font-bold flex gap-2">
          {selectedSubCategory?.icon}
          {selectedSubCategory?.name}
        </div>
        <div className="flex align-middle gap-5 text-sm">
          {selectedSubCategory?.sections?.map((section) => (
            <button
              key={section.name}
              className="cursor-pointer hover:text-black text-gray-600"
              onClick={() => {
                navigate(
                  `/shop?category=${activeMenu}&subcategory=${activeSubCategory}&section=${section.name}`,
                );
              }}
            >
              <div>
                {section.icon} {section.name}
              </div>
            </button>
          ))}
        </div>
      </section>
    </nav>
  );
};

export default SubNav;
