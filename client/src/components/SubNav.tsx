import DropDownIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { subNavData } from "../data/subNavData";
import { useState } from "react";

const SubNav = () => {
  const [activeMenu, setActiveMenu] = useState<string>("Products");

  return (
    <nav className="flex flex-col gap-5 flex-auto justify-between align-bottom font-bold ml-25 mr-25 mt-5 mb-5">
      <div className="flex flex-row gap-5">
        {subNavData.map((category) => (
          <div
            className="hover:cursor-pointer"
            key={category.name}
            onMouseEnter={() => setActiveMenu(category.name)}
          >
            {category.name}
            <span>
              <DropDownIcon />
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-row gap-4">
        {subNavData
          .find((category) => category.name === activeMenu)
          ?.subcategories?.map((subcat) => (
            <div key={subcat.name} className="hover:cursor-pointer">
              <span className="icon">{subcat.icon}</span>
              <span>{subcat.name}</span>
            </div>
          ))}
      </div>
    </nav>
  );
};

export default SubNav;
