import DeliveryIcon from "@mui/icons-material/MopedOutlined";
import ProfileIcon from "@mui/icons-material/PersonOutlineRounded";
import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import CartIcon from "@mui/icons-material/ShoppingBagOutlined";

const Navbar = () => {
  return (
    <nav
      role="navigation"
      aria-label="navigation bar"
      class="flex flex-nowrap flex-auto justify-between align-bottom font-bold ml-25 mr-25 mt-5 mb-5"
    >
      {/* logo section */}
      <div class="text-[32px]">cubazzar</div>

      {/* page links */}
      <div class="flex justify-between gap-12">
        <div>Shop</div>
        <div>Services</div>
        <div>Deals & Discounts</div>
        <div>News & Events</div>
      </div>

      {/* user interaction icons*/}
      <div class="flex justify-between gap-5.25">
        <div>
          <DeliveryIcon />
        </div>
        <div>
          <ProfileIcon />
        </div>
        <div>
          <WishlistIcon />
        </div>
        <div>
          <CartIcon />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
