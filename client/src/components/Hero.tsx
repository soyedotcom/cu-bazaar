import SearchIcon from "@mui/icons-material/SearchOutlined";
import LinkIcon from "@mui/icons-material/ArrowForward";

import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="flex flex-col justify-center align-middle items-center mt-20 mb-10">
        <div className="flex flex-col gap-3.75 text-[30px] font-bold">
          <p>Hello there,</p>
          <p>What are you looking for today?</p>
        </div>

        <div className="flex p-2.5 gap-3.75 border-2 rounded-full h-12 w-169 mt-10">
          <SearchIcon />
          <input type="text" placeholder="Browse and buy items" />
        </div>
      </section>

      <section className="flex flex-row gap-5 justify-center align-middle items-center">
        <div className="w-60 h-60 bg-pink-300 rounded-2xl hover:cursor-pointer"></div>
        <div className="w-60 h-60 bg-pink-300 rounded-2xl hover:cursor-pointer"></div>
        <div className="w-60 h-60 bg-pink-300 rounded-2xl hover:cursor-pointer"></div>
        <div className="w-60 h-60 bg-pink-300 rounded-2xl hover:cursor-pointer"></div>
      </section>

      <section>
        <div className="m-5">
          <Link to="/shop">
            <button className="bg-black text-white border-none rounded-full h-12 w-60.75 hover:cursor-pointer">
              <p>
                Start Shopping <LinkIcon />
              </p>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hero;
