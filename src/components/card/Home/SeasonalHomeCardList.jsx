import { FaRegBookmark, FaStar, FaPlus, FaPlay } from "react-icons/fa";
import { GrAdd, GrBookmark, GrPlay, GrStar } from "react-icons/gr";
import { NavLink } from "react-router-dom";
const SeasonalHomeCardList = ({ currEle }) => {
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

  //function to convert views
  function showViews(members) {
    if (members >= 1e9)
      return (members / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    if (members >= 1e6)
      return (members / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    if (members >= 1e3)
      return (members / 1e3).toFixed(1).replace(/\.0$/, "") + "k";

    return members.toSting();
  }

  return (
    <NavLink to={`/anime/${mal_id}`}>
      <li className={` w-full select-none cursor-pointer hover:detailed-info`}>
        {/* Poster */}
        <div className="w-full aspect-2/3 bg-[#111] overflow-hidden ">
          <img
            src={images.webp.large_image_url}
            alt={title_english}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="mt-2.5">
          <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2">
            {title_english}
          </h3>

          <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">
            {genres.map((g) => g.name).join(" | ")}
          </p>
        </div>

        {/* overlay detailed-info */}
        <div className="detailed-info">
          <div className="m-3">
            <div className="">
              <h3 className=" text-md font-bold">{title_english || title}</h3>
            </div>

            <div className="text-[#8c8c8c] text-sm font-semibold mt-3">
              <p className="text-[#bbbbbb] flex  gap-1">
                {score || "NR"} <GrStar size={18} />
                <span>{`(${showViews(members)})`}</span>
              </p>
              <p className="pt-2 pb-3">{episodes} Episodes </p>
            </div>

            <div className="text-sm ">
              <p className="line-clamp-6 leading-relaxed tracking-normal">
                {synopsis}
              </p>
            </div>
          </div>
          <div className=" flex items-center gap-6 text-[#f47521] absolute bottom-4 left-4 ">
            <button className="cursor-pointer">
              <GrPlay size={22} />
            </button>
            <button className="cursor-pointer">
              <span>
                <GrBookmark size={22} />
              </span>
            </button>
            <button className="cursor-pointer">
              <span>
                <GrAdd size={22} />
              </span>
            </button>
          </div>
        </div>
      </li>
    </NavLink>
  );
};

export default SeasonalHomeCardList;
