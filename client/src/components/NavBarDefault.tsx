import DeliveryIcon from "@mui/icons-material/MopedOutlined";
import ProfileIcon from "@mui/icons-material/PersonOutlineRounded";
import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import CartIcon from "@mui/icons-material/ShoppingBagOutlined";

import { Link } from "react-router-dom";

const NavBarDefault = () => {
  return (
    <nav
      role="navigation"
      aria-label="navigation bar"
      className="flex flex-nowrap flex-auto justify-between align-bottom font-bold ml-25 mr-25 mt-5 mb-5"
    >
      {/* logo section */}
      <Link to="/">
        <div className="text-[32px]">cubazzar</div>
      </Link>

      {/* page links */}
      <div className="flex justify-between gap-12">
        <Link to="/shop">
          <div>Shop</div>
        </Link>

        <Link to="/services">
          <div>Services</div>
        </Link>

        <Link to="/dealsanddiscounts">
          <div>Deals & Discounts</div>
        </Link>

        <Link to="/newsandevents">
          <div>News & Events</div>
        </Link>
      </div>

      {/* user interaction icons*/}
      <div className="flex justify-between gap-5.25">
        <Link to="/deliveries">
          <div>
            <DeliveryIcon />
          </div>
        </Link>
        <Link to="/profile">
          <div>
            <ProfileIcon />
          </div>
        </Link>
        <Link to="/wishlist">
          <div>
            <WishlistIcon />
          </div>
        </Link>
        <Link to="/cart">
          <div>
            <CartIcon />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default NavBarDefault;
