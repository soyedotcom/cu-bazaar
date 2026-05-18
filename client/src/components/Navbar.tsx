import NavBarSearch from "./NavBarSearch";
import NavBarDefault from "./NavBarDefault";

import { useLocation } from "react-router-dom";

const Navbar = () => {
  const currentPage = useLocation();
  const isHome =
    currentPage.pathname === "/" || currentPage.pathname === "/showcase";

  if (isHome) {
    return <NavBarDefault />;
  }
  return <NavBarSearch />;
};

export default Navbar;
