import SearchBar from "./SearchBar";
import StartShoppingBtn from "./StartShoppingBtn";

const Hero = () => {
  return (
    <>
      <section className="flex flex-col justify-center align-middle items-center mt-20">
        <div className="flex flex-col gap-3.75 text-[30px] font-bold mb-10">
          <p>Hello there,</p>
          <p>What are you looking for today?</p>
        </div>

        <SearchBar />
      </section>

      <section className="flex flex-row gap-5 justify-center align-middle items-center m-10">
        <div className="w-50 h-50 bg-pink-300 rounded-2xl hover:cursor-pointer"></div>
        <div className="w-50 h-50 bg-pink-300 rounded-2xl hover:cursor-pointer"></div>
        <div className="w-50 h-50 bg-pink-300 rounded-2xl hover:cursor-pointer"></div>
        <div className="w-50 h-50 bg-pink-300 rounded-2xl hover:cursor-pointer"></div>
      </section>

      <section>
        <div>
          <StartShoppingBtn />
        </div>
      </section>
    </>
  );
};

export default Hero;
