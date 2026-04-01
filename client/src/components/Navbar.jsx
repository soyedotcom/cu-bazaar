import DeliveryIcon from "@mui/icons-material/MopedOutlined";
import ProfileIcon from "@mui/icons-material/PersonOutlineRounded";
import WishlistIcon from "@mui/icons-material/FavoriteBorderRounded";
import CartIcon from "@mui/icons-material/ShoppingBagOutlined";

const Navbar = () => {
  return (
    <nav
      role="navigation"
      aria-label="navigation bar"
      class="flex flex-nowrap flex-auto justify-between align-bottom font-bold ml-[100px] mr-[100px] mt-[20px] mb-[20px]"
    >
      {/* logo section */}
      <div class="text-[32px]">cubazzar</div>

      {/* page links */}
      <div class="flex justify-between gap-[48px]">
        <div>Shop</div>
        <div>Services</div>
        <div>Deals & Discounts</div>
        <div>News & Events</div>
      </div>

      {/* user interaction icons*/}
      <div class="flex justify-between gap-[21px]">
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
