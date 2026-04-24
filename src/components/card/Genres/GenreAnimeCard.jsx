// src/components/card/Genres/GenreAnimeCard.jsx
import { useState } from "react";
import { GrAdd, GrBookmark, GrPlay, GrStar } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const GenreAnimeCard = ({ anime, viewMode = "grid", columns = 5 }) => {
  // Destructure safely
  const {
    mal_id,
    title_english,
    title,
    images,
    episodes,
    members,
    score,
    synopsis,
    status,
    genres = [],
  } = anime;

  // Status colors
  const normalizeStatus = (status) => {
    if (!status) return "NA";
    const s = status.toLowerCase();
    if (s.includes("currently")) return "currently";
    if (s.includes("finished")) return "finished";
    if (s.includes("not yet")) return "upcoming";
    return "NA";
  };

  const statusStyles = {
    currently: "text-orange-400 bg-orange-500/20",
    finished: "text-red-400 bg-red-500/20",
    upcoming: "text-blue-400 bg-blue-500/20",
    NA: "text-gray-400 bg-gray-500/20",
  };

  // Function to convert views
  function showViews(members) {
    if (members >= 1e9)
      return (members / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    if (members >= 1e6)
      return (members / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    if (members >= 1e3)
      return (members / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
    return String(members);
  }

  // List View Layout
  if (viewMode === "list") {
    return (
      <li className="w-full bg-gray-900 rounded overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300">
        <div className="flex flex-col sm:flex-row">
          {/* Image on left for desktop, top for mobile */}
          <div className="sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 h-48 sm:h-auto">
            <div className="w-full h-full aspect-2/3 bg-[#111] overflow-hidden">
              <img
                src={
                  images?.webp?.large_image_url || images?.jpg?.large_image_url
                }
                alt={title_english || title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content on right */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="flex flex-col h-full">
              {/* Title and basic info */}
              <div className="mb-4">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  {title_english || title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                  {score && (
                    <div className="flex items-center gap-1">
                      <GrStar className="text-orange-400 mb-1" size={18} />
                      <span className="font-medium">{score.toFixed(1)}</span>
                      <span className="text-xs">({showViews(members)})</span>
                    </div>
                  )}

                  {episodes && <span>• {episodes} Episodes</span>}

                  <span
                    className={`px-2 py-1 text-xs rounded-full ${statusStyles[normalizeStatus(status)]}`}
                  >
                    {status || "Unknown"}
                  </span>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {genres.slice(0, 3).map((g) => (
                    <span
                      key={g.mal_id}
                      className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full"
                    >
                      {g.name}
                    </span>
                  ))}
                  {genres.length > 3 && (
                    <span className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-full">
                      +{genres.length - 3} more
                    </span>
                  )}
                </div>

                {/* Synopsis - truncated */}
                <p className="text-gray-300 text-sm line-clamp-3">
                  {synopsis || "No description available."}
                </p>
              </div>

              {/* Action buttons at bottom */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                <div className="text-xs text-gray-500">
                  Click for more details
                </div>

                <div className="flex items-center gap-4">
                  <NavLink
                    to={`/anime/${mal_id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <GrPlay size={16} />
                    <span>View Details</span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }

  // Grid View (Default) - Adjust based on columns
  const getGridStyles = () => {
    switch (columns) {
      case 4:
        return "text-xs";
      case 5:
        return "text-xs";
      case 6:
        return "text-xs text-[10px]";
      default:
        return "text-sm";
    }
  };

  const getLineClamp = () => {
    switch (columns) {
      case 4:
        return "line-clamp-5";
      case 5:
        return "line-clamp-4";
      case 6:
        return "line-clamp-3";
      default:
        return "line-clamp-6";
    }
  };

  const textSizeClass = getGridStyles();
  const synopsisClamp = getLineClamp();

  return (
    <NavLink to={`/anime/${mal_id}`}>
      <li className="relative w-full select-none cursor-pointer group list-none">
        {/* Card Container */}
        <div className="relative ">
          {/* Poster */}
          <div className="w-full h-full aspect-2/3 bg-[#111] ">
            <img
              src={
                images?.webp?.large_image_url || images?.jpg?.large_image_url
              }
              alt={title_english || title}
              className="w-full h-full object-cover "
              loading="lazy"
            />
          </div>

          {/* Info always visible */}
          <div className="p-2 sm:p-2">
            <h3
              className={`font-semibold text-white leading-tight line-clamp-2 mb-1 ${textSizeClass}`}
            >
              {title_english || title}
            </h3>

            <p
              className={`text-gray-400 line-clamp-1 tracking-tight ${textSizeClass}`}
            >
              {genres
                .slice(0, 3)
                .map((g) => g.name)
                .join(" | ")}
              {genres.length > 3 && " | +more"}
            </p>
          </div>

          {/* Hover Detailed Info */}
          {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#19191b]  p-3 sm:p-4 opacity-0 invisible hover:opacity-94 group-hover:visible transition-all duration-300 z-10 overflow-hidden flex flex-col"> */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#19191b] p-3 sm:p-4 opacity-0 invisible group-hover:opacity-94 group-hover:visible transition-all duration-300 z-10 overflow-hidden flex flex-col">
            {/* Title */}
            <div className="mb-2">
              <h3
                className={`font-bold text-white line-clamp-2 ${textSizeClass}`}
              >
                {title_english || title}
              </h3>
            </div>

            {/* Stats */}
            <div
              className={`text-[#8c8c8c] font-semibold mb-2 ${textSizeClass}`}
            >
              {score && (
                <p className="text-[#bbbbbb] flex gap-1 items-center">
                  <span>{score.toFixed(1)}</span>
                  <GrStar size={columns === 6 ? 14 : 16} />
                  <span>{`(${showViews(members)})`}</span>
                </p>
              )}

              {episodes && <p className="py-1">{episodes} Episodes</p>}

              {/* Status Badge */}
              <p className="py-2 inline-block">
                <span
                  className={`px-2 py-1 rounded-full ${statusStyles[normalizeStatus(status)]} ${textSizeClass}`}
                >
                  {status || "Unknown"}
                </span>
              </p>
            </div>

            {/* Synopsis - Adjust based on columns */}
            <div className="flex-1 overflow-hidden">
              <p
                className={`text-white leading-relaxed tracking-normal ${synopsisClamp} ${textSizeClass}`}
              >
                {synopsis || "No description available."}
              </p>
            </div>

            {/* Action Buttons  */}
            <div className="flex items-center gap-4 sm:gap-6 text-[#f47521] mt-3 pt-3">
              <button className="cursor-pointer hover:scale-110 transition-transform">
                <GrPlay size={columns === 6 ? 18 : 22} />
              </button>

              <button className="cursor-pointer hover:scale-110 transition-transform">
                <GrBookmark size={columns === 6 ? 18 : 22} />
              </button>

              <button className="cursor-pointer hover:scale-110 transition-transform">
                <GrAdd size={columns === 6 ? 18 : 22} />
              </button>
            </div>
          </div>
        </div>
      </li>
    </NavLink>
  );
};

export default GenreAnimeCard;
