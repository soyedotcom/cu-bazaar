import SearchIcon from "@mui/icons-material/SearchOutlined";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        navigate(`/shop?q=${encodeURIComponent(query)}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // still works on Enter
  };

  return (
    <>
      <form
        className="flex items-center p-2.5 gap-3.75 border-2 rounded-full h-10.5 w-169"
        onSubmit={handleSearch}
      >
        <SearchIcon />
        <input
          className="focus:outline-none"
          type="text"
          placeholder="Browse and buy items"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </form>
    </>
  );
};

export default SearchBar;
