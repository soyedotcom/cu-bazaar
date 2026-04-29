import LinkIcon from "@mui/icons-material/ArrowForward";

import { Link } from "react-router-dom";

const StartShoppingBtn = () => {
  return (
    <>
      <Link to="/shop">
        <button className="bg-black text-white border-none rounded-full h-12 w-60.75 hover:cursor-pointer">
          <p>
            Start Shopping <LinkIcon />
          </p>
        </button>
      </Link>
    </>
  );
};

export default StartShoppingBtn;
