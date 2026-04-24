// src/components/UI/Genres/GenreAnimePage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiGrid, FiList } from "react-icons/fi";
import { TfiLayoutGrid2, TfiLayoutGrid3 } from "react-icons/tfi";
import GetGenreAnime from "../../../api/Genres/GetGenreAnime";
import GenreAnimeCard from "../../card/Genres/GenreAnimeCard";
import Genres from "./Genres";

const GenreAnimePage = () => {
  const { genreId, genreName } = useParams();
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState("popularity");
  const [type, setType] = useState("all");
  const [gridView, setGridView] = useState("grid"); // grid or list
  const [itemsPerRow, setItemsPerRow] = useState(5); // 4, 5, or 6

  useEffect(() => {
    if (!genreId) {
      setAnimeList([]);
      return;
    }

    const fetchAnime = async () => {
      try {
        setLoading(true);
        const data = await GetGenreAnime(genreId, page, orderBy, type);
        setAnimeList(data.data || []);
        setHasNextPage(data.pagination?.has_next_page || false);
      } catch (err) {
        console.error("Fetch error:", err);
        setAnimeList([]);
        setHasNextPage(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [genreId, page, orderBy, type]);

  // Responsive items per row
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640)
        setItemsPerRow(2); // Mobile
      else if (window.innerWidth < 768)
        setItemsPerRow(3); // Tablet
      else if (window.innerWidth < 1024)
        setItemsPerRow(4); // Small desktop
      else if (window.innerWidth < 1280)
        setItemsPerRow(5); // Medium desktop
      else setItemsPerRow(6); // Large desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hero background image
  const heroImage =
    animeList[0]?.images?.jpg?.large_image_url ||
    animeList[0]?.images?.webp?.large_image_url;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 to-black text-white">
      {/* Hero Section - Fixed Height */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {heroImage ? (
            <>
              <img
                src={heroImage}
                alt="genre-banner"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/80 to-transparent" />
              <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/60 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-linear-to-br from-purple-900/30 to-blue-900/30" />
          )}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-end px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
          <div>
            <h1 className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {genreName || "Explore Anime Genres"}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg">
              {genreName
                ? `Browse the best ${genreName.toLowerCase()} anime series and movies`
                : "Discover anime from all genres"}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Left Sidebar - Genres List */}
          <div className="lg:w-64 xl:w-72 shrink-0">
            <div className="sticky top-24">
              <Genres />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            {/* Page Title & Controls */}
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {genreName || "All Anime"}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {genreId
                      ? `${animeList.length} anime found`
                      : "Select a genre to view anime"}
                  </p>
                </div>

                {/* View Controls - Only show when genre is selected */}
                {genreId && (
                  <div className="flex items-center gap-3">
                    {/* Grid/List Toggle */}
                    <div className="flex items-center bg-gray-900 rounded-lg p-1">
                      <button
                        onClick={() => setGridView("grid")}
                        className={`p-2 rounded ${gridView === "grid" ? "bg-gray-800 text-orange-500" : "text-gray-400 hover:text-white"}`}
                      >
                        <FiGrid size={18} />
                      </button>
                      <button
                        onClick={() => setGridView("list")}
                        className={`p-2 rounded ${gridView === "list" ? "bg-gray-800 text-orange-500" : "text-gray-400 hover:text-white"}`}
                      >
                        <FiList size={18} />
                      </button>
                    </div>

                    {/* Items Per Row - Only for grid view */}
                    {gridView === "grid" && (
                      <div className="flex items-center bg-gray-900 rounded-lg p-1">
                        {[4, 5, 6].map((num) => (
                          <button
                            key={num}
                            onClick={() => setItemsPerRow(num)}
                            className={`p-2 rounded ${itemsPerRow === num ? "bg-gray-800 text-orange-500" : "text-gray-400 hover:text-white"}`}
                          >
                            {num === 4 ? (
                              <TfiLayoutGrid2 size={16} />
                            ) : num === 5 ? (
                              <TfiLayoutGrid3 size={16} />
                            ) : (
                              <span className="text-sm font-bold">6</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Filters - Only show when genre is selected */}
              {genreId && (
                <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-900/50 rounded-xl">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm text-gray-400 mb-2">
                      Sort By
                    </label>
                    <select
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      value={orderBy}
                      onChange={(e) => {
                        setOrderBy(e.target.value);
                        setPage(1);
                      }}
                    >
                      <option value="popularity">Most Popular</option>
                      <option value="score">Highest Rated</option>
                      <option value="title">A to Z</option>
                      <option value="start_date">Newest First</option>
                      <option value="end_date">Oldest First</option>
                    </select>
                  </div>

                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm text-gray-400 mb-2">
                      Type
                    </label>
                    <select
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        setPage(1);
                      }}
                    >
                      <option value="all">All Types</option>
                      <option value="tv">TV Series</option>
                      <option value="movie">Movies</option>
                      <option value="ova">OVA</option>
                      <option value="special">Specials</option>
                      <option value="ona">ONA</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div
                className={`grid gap-4 md:gap-6 ${
                  gridView === "grid"
                    ? `grid-cols-2 sm:grid-cols-3 md:grid-cols-${itemsPerRow - 2} lg:grid-cols-${itemsPerRow - 1} xl:grid-cols-${itemsPerRow}`
                    : "grid-cols-1"
                }`}
              >
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`bg-gray-900 animate-pulse  ${
                      gridView === "grid" ? "aspect-[2/3]" : "h-32"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Anime Grid/List */}
            {!loading && animeList.length > 0 && (
              <>
                <div
                  className={`${
                    gridView === "grid"
                      ? `grid gap-4 md:gap-6 ${
                          itemsPerRow === 4
                            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
                            : itemsPerRow === 5
                              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                              : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
                        }`
                      : "flex flex-col gap-4"
                  } cursor-pointer`}
                >
                  {animeList.map((anime) => (
                    <GenreAnimeCard
                      key={anime.mal_id}
                      anime={anime}
                      viewMode={gridView}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-800">
                  <div className="text-sm text-gray-400">
                    Page {page} • {animeList.length} items
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => p - 1)}
                      className="cursor-pointer flex items-center rounded gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiChevronLeft />
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="flex items-center gap-1 ">
                      {[...Array(3)].map((_, i) => {
                        const pageNum = Math.max(1, page + i);
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={` cursor-pointer w-10 h-10 rounded flex items-center justify-center ${
                              page === pageNum
                                ? "bg-orange-600 text-white"
                                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      disabled={!hasNextPage}
                      onClick={() => setPage((p) => p + 1)}
                      className="flex items-center rounded gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed  transition-colors cursor-pointer"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Empty State - No Genre Selected */}
            {!loading && !genreId && (
              <div className="text-center py-16 md:py-24">
                <div className="text-6xl mb-6">🎌</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Select a Genre
                </h3>
                <p className="text-gray-400 max-w-md mx-auto text-lg">
                  Choose a genre from the sidebar to explore amazing anime
                  content. Each genre has hundreds of anime waiting for you!
                </p>
              </div>
            )}

            {/* Empty State - No Anime Found */}
            {!loading && genreId && animeList.length === 0 && (
              <div className="text-center py-16 md:py-24">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  No Anime Found
                </h3>
                <p className="text-gray-400 max-w-md mx-auto text-lg">
                  Try adjusting your filters or select a different genre.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreAnimePage;
