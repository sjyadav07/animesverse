import React from "react";
import { GrAdd, GrBookmark, GrPlay, GrStar } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const SeasonalPageCardList = ({ currEle }) => {
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
    trailer,
    genres = [],
  } = currEle;

  // Function to convert views
  function showViews(members) {
    if (members >= 1e9)
      return (members / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    if (members >= 1e6)
      return (members / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    if (members >= 1e3)
      return (members / 1e3).toFixed(1).replace(/\.0$/, "") + "k";

    return members.toString();
  }

  return (
    <NavLink to={`/anime/${mal_id}`}>
      <li className="relative w-[150px] select-none cursor-pointer group">
        {/* Card content */}
        <div>
          {/* img */}
          <div className="w-full aspect-2/3 bg-black overflow-hidden">
            <img
              src={images.webp.image_url}
              alt={title_english}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* info */}
          <div className="mt-2.5">
            <h3 className="text-white text-sm font-medium leading-tight line-clamp-3">
              {title_english || title}
            </h3>
            <p className="text-xs text-gray-400 mt-2 mb-6 line-clamp-2">
              {genres.map((g) => g.name).join(" | ")}
            </p>
          </div>
        </div>

        {/* overlay detailed-info */}
        <div className="detailed-info absolute inset-0 opacity-0 group-hover:opacity-95 transition-all duration-200 z-10 bg-[#19191b]">
          <div className="m-3">
            <div>
              <h3 className=" text-xs leading-relaxed tracking-wider md:text-md font-bold text-white line-clamp-4">
                {title_english || title}
              </h3>
            </div>

            <div className="text-[#bbbbbb] text-xs  font-semibold mt-3">
              <p className="text-[#bbbbbb] flex items-center gap-1">
                {score || "NR"} <GrStar />
                <span>{`(${showViews(members)})`}</span>
              </p>
              <p className="pt-2 pb-3">{episodes} Episodes</p>
            </div>

            <div className="text-xs text-white">
              <p className="line-clamp-5 leading-relaxed tracking-normal">
                {synopsis}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[#f47521] absolute bottom-3 left-2">
            <button className="cursor-pointer">
              <GrPlay size={18} />
            </button>
            <button className="cursor-pointer">
              <span>
                <GrBookmark size={18} />
              </span>
            </button>
            <button className="cursor-pointer">
              <span>
                <GrAdd size={18} />
              </span>
            </button>
          </div>
        </div>
      </li>
    </NavLink>
  );
};

export default SeasonalPageCardList;
