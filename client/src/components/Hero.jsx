import SearchIcon from "@mui/icons-material/SearchOutlined";
import LinkIcon from "@mui/icons-material/ArrowForward";

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section class="flex flex-col justify-center align-middle items-center">
      <div class="flex flex-col gap-3.75 text-[32px] font-bold">
        <p>Hello there,</p>
        <p>What are you looking for today?</p>
      </div>

      <div class="flex p-2.5 gap-3.75 border-2 rounded-full h-12 w-169.28 mt-13.75">
        <SearchIcon />
        <input type="text" placeholder="Browse and buy items" />
      </div>

      <div class="m-5">
        <Link to="/shop">
          <button class="bg-black text-white border-none rounded-full h-12 w-60.75 hover:cursor-pointer">
            <p>
              Start Shopping <LinkIcon />
            </p>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
