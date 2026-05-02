import SearchIcon from "@mui/icons-material/SearchOutlined";

const SearchBar = () => {
  return (
    <>
      <div className="flex items-center p-2.5 gap-3.75 border-2 rounded-full h-10.5 w-169">
        <SearchIcon />
        <input
          className="focus:outline-none"
          type="text"
          placeholder="Browse and buy items"
        />
      </div>
    </>
  );
};

export default SearchBar;
