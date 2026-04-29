import SearchBar from "./SearchBar";
import StartShoppingBtn from "./StartShoppingBtn";

const Hero = () => {
  return (
    <>
      <section className="flex flex-col justify-center align-middle items-center mt-20 mb-10">
        <div className="flex flex-col gap-3.75 text-[30px] font-bold">
          <p>Hello there,</p>
          <p>What are you looking for today?</p>
        </div>

        <SearchBar />
      </section>

      <section className="flex flex-row gap-5 justify-center align-middle items-center">
        <div className="w-60 h-60 bg-pink-300 rounded-2xl hover:cursor-pointer"></div>
        <div className="w-60 h-60 bg-pink-300 rounded-2xl hover:cursor-pointer"></div>
        <div className="w-60 h-60 bg-pink-300 rounded-2xl hover:cursor-pointer"></div>
        <div className="w-60 h-60 bg-pink-300 rounded-2xl hover:cursor-pointer"></div>
      </section>

      <section>
        <div className="m-5">
          <StartShoppingBtn />
        </div>
      </section>
    </>
  );
};

export default Hero;
