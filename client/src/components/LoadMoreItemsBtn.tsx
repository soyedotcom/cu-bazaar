import { Link } from "react-router-dom";

const LoadMoreItemsBtn = () => {
  return (
    <>
      <Link to="/">
        <button className="bg-black text-white border-none rounded-full h-12 w-60.75 hover:cursor-pointer">
          <p>Load More Items</p>
        </button>
      </Link>
    </>
  );
};

export default LoadMoreItemsBtn;
