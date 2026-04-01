import SearchIcon from "@mui/icons-material/SearchOutlined";
import LinkIcon from "@mui/icons-material/ArrowForward";

const Hero = () => {
  return (
    <section class="flex flex-col justify-center align-middle items-center">
      <div class="flex flex-col gap-[15px] text-[32px] font-bold">
        <p>Hello there,</p>
        <p>What are you looking for today?</p>
      </div>

      <div class="flex p-[10px] gap-[15px] border-2 rounded-full h-[48px] w-[677px] mt-[55px]">
        <SearchIcon />
        <input type="text" placeholder="Browse and buy items" />
      </div>

      <div class="m-[20px]">
        <button class="bg-black text-white border-none rounded-full h-[48px] w-[243px]">
          <p>
            Start Shopping <LinkIcon />
          </p>
        </button>
      </div>
    </section>
  );
};

export default Hero;
