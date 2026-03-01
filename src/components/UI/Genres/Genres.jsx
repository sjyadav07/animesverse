// src/components/UI/Genres/Genres.jsx
import React, { useState } from "react";
import { genresList } from "../../../api/Genres/genresList";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Genres = () => {
  const navigate = useNavigate();
  const { genreId } = useParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Group genres by category for better organization
  const genreCategories = [
    {
      title: "Popular Genres",
      genres: genresList.filter((g) =>
        [
          "Action",
          "Adventure",
          "Comedy",
          "Drama",
          "Fantasy",
          "Romance",
        ].includes(g.name),
      ),
    },
    {
      title: "More Genres",
      genres: genresList.filter(
        (g) =>
          ![
            "Action",
            "Adventure",
            "Comedy",
            "Drama",
            "Fantasy",
            "Romance",
          ].includes(g.name),
      ),
    },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎭</span>
            <div className="text-left">
              <div className="font-bold text-white">Browse Genres</div>
              <div className="text-sm text-gray-400">
                {genreId
                  ? genresList.find((g) => g.id === Number(genreId))?.name ||
                    "Select"
                  : "Choose a genre"}
              </div>
            </div>
          </div>
          {mobileOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </button>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="mt-3 p-4 bg-gray-800 rounded-xl max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {genresList.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    navigate(`/genres/${g.id}/${g.name}`);
                    setMobileOpen(false);
                  }}
                  className={` p-3 rounded-lg text-sm transition-all ${
                    Number(genreId) === g.id
                      ? "bg-orange-600 text-white"
                      : "bg-gray-900 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎭</span>
            <div>
              <h2 className="text-xl font-bold text-white">Genres</h2>
              <p className="text-sm text-gray-400">Browse by category</p>
            </div>
          </div>

          {/* Popular Genres */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Popular
            </h3>
            <div className="space-y-2">
              {genreCategories[0].genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => navigate(`/genres/${g.id}/${g.name}`)}
                  className={`cursor-pointer w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between ${
                    Number(genreId) === g.id
                      ? "bg-linear-to-r from-orange-500/20 to-orange-500/10 text-orange-400 border-l-4 border-orange-500"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span className="font-medium">{g.name}</span>
                  {Number(genreId) === g.id && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* More Genres */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              More Categories
            </h3>
            <div className="space-y-2">
              {genreCategories[1].genres.map((g) => (
                <button
                  key={g.id}
                  onClick={() => navigate(`/genres/${g.id}/${g.name}`)}
                  className={`cursor-pointer w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between ${
                    Number(genreId) === g.id
                      ? "bg-linear-to-r from-orange-500/20 to-orange-500/10 text-orange-400 border-l-4 border-orange-500"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span className="font-medium">{g.name}</span>
                  {Number(genreId) === g.id && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <h3 className="text-sm font-semibold text-white mb-2">
            🎯 Quick Tip
          </h3>
          <p className="text-xs text-gray-400">
            Use filters to sort by popularity, rating, or type. Each genre has
            unique anime collections!
          </p>
        </div>
      </div>
    </>
  );
};

export default Genres;
