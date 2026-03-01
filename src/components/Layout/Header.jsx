import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineSearch, HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowSearch(false);
      setShowMenu(false);
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-[#272727] border-b border-[#1f2937]">
      {/* TOP BAR */}
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4 py-3 lg:px-10">
        {/* LOGO */}
        <NavLink
          to="/"
          className="text-2xl font-bold tracking-wide text-[#ff640a] hover:text-white"
        >
          AnimeVerse
        </NavLink>

        {/* DESKTOP NAV (ONLY ≥1024px) */}
        <nav className="hidden lg:flex items-center gap-12 text-sm font-medium text-gray-300">
          <NavLink to="/home" className="hover:text-[#ff640a] transition">
            Home
          </NavLink>

          <NavLink
            to="/seasonal-page"
            className="hover:text-[#ff640a] transition"
          >
            Seasonal
          </NavLink>

          <NavLink to="/top-animes" className="hover:text-[#ff640a] transition">
            Top Anime
          </NavLink>

          <NavLink
            to="/genres/1/Action"
            className="hover:text-[#ff640a] transition"
          >
            Genres
          </NavLink>
        </nav>

        {/* DESKTOP SEARCH */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center border border-[#1f2937] rounded-md overflow-hidden bg-[#020617]"
        >
          <input
            type="text"
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent px-4 py-2 text-sm text-gray-200 outline-none w-64"
          />
          <button
            type="submit"
            className="px-3 text-[#ff640a] hover:bg-[#111827] cursor-pointer"
          >
            <HiOutlineSearch size={18} />
          </button>
        </form>

        {/* MOBILE ICONS (≤1023px) */}
        <div className="flex items-center gap-5 lg:hidden">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-gray-300"
          >
            {showSearch ? (
              <HiOutlineX size={24} />
            ) : (
              <HiOutlineSearch size={24} />
            )}
          </button>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-300 cursor-pointer"
          >
            {showMenu ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      {showSearch && (
        <form onSubmit={handleSearch} className="lg:hidden px-4 pb-3">
          <input
            type="text"
            placeholder="Search anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#020617] border border-[#ff640a] px-4 py-2 rounded-md text-sm text-gray-200 outline-none"
          />
        </form>
      )}

      {/* MOBILE MENU */}
      {showMenu && (
        <nav className="lg:hidden bg-[#272727] px-4 py-4 space-y-4 text-sm text-gray-300 border-t border-[#ff640a]">
          <NavLink
            to="/home"
            onClick={() => setShowMenu(false)}
            className="block hover:text-[#ff640a]"
          >
            Home
          </NavLink>

          <NavLink
            to="/seasonal-page"
            onClick={() => setShowMenu(false)}
            className="block hover:text-[#ff640a]"
          >
            Seasonal
          </NavLink>

          <NavLink
            to="/top-animes"
            onClick={() => setShowMenu(false)}
            className="block hover:text-[#ff640a]"
          >
            Top Anime
          </NavLink>

          <NavLink
            to="/genres/1/Action"
            onClick={() => setShowMenu(false)}
            className="block hover:text-[#ff640a]"
          >
            Genres
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
