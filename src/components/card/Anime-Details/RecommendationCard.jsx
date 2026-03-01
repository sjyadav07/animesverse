import { NavLink } from "react-router-dom";
import { GrAdd, GrBookmark, GrPlay, GrStar } from "react-icons/gr";
import { useState } from "react";

const RecommendationCard = ({ data }) => {
  if (!data) return null;

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const mal_id = data.mal_id;
  const title = data.title || "Unknown";
  const imageUrl = data.images?.jpg?.image_url;

  // Fetch details on hover
  const fetchDetails = async () => {
    if (details || loading) return;

    setLoading(true);
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`);
      const json = await res.json();
      setDetails(json.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format numbers
  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num;
  };

  return (
    <li
      className="w-full  select-none cursor-pointer hover:detailed-info list-none relative"
      onMouseEnter={fetchDetails}
    >
      {/* Poster */}
      <div className="w-full aspect-2/3 bg-[#111] ">
        <img
          src={imageUrl || "https://via.placeholder.com/300x450?text=No+Image"}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
          }}
        />
      </div>

      {/* Title aur Genres - DONO dikhenge jab details aayenge */}
      <div className="mt-1">
        <h3 className="text-sm font-semibold text-white leading-tight line-clamp-1">
          {title}
        </h3>

        {/* Genres title ke niche - jab details available ho */}
        {details && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
            {details.genres
              ?.slice(0, 2)
              .map((g) => g.name)
              .join(" | ") || "Anime"}
          </p>
        )}

        {/* Jab details nahi, to kuch mat dikhao - but height maintain rahe */}
        {!details && !loading && <div className="h-3" />}
      </div>

      {/* HOVER OVERLAY */}
      <div className="detailed-info">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#f47521] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : details ? (
          <div className="m-3 flex flex-col h-full">
            <h3 className="text-sm font-bold text-white line-clamp-2">
              {title}
            </h3>

            <div className="text-[#8c8c8c] text-sm font-semibold mt-2">
              <p className="text-[#bbbbbb] flex items-center gap-1">
                {details.score || "NR"}
                <GrStar size={18} />
                <span className="ml-1">({formatNumber(details.members)})</span>
              </p>
              <p className="pt-1 pb-2 text-xs">
                {details.episodes || "?"} Episodes
              </p>
            </div>

            {/* Genres inside hover - optional */}
            {details.genres?.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-1">
                {details.genres.slice(0, 3).map((genre) => (
                  <span
                    key={genre.mal_id}
                    className="text-xs bg-gray-800 px-2 py-0.5 rounded"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className="lg:text-sm text-xs text-white line-clamp-4 leading-relaxed">
              {details.synopsis || "No synopsis available."}
            </p>

            <div className="flex items-center gap-6 text-[#f47521] mt-auto mb-5 pt-3">
              <NavLink to={`/anime/${mal_id}`}>
                <GrPlay size={22} />
              </NavLink>
              <button className="cursor-pointer">
                <GrBookmark size={22} />
              </button>
              <button className="cursor-pointer">
                <GrAdd size={22} />
              </button>
            </div>
          </div>
        ) : (
          <div className="m-3">
            <p className="text-sm text-gray-400">Hover to load details</p>
          </div>
        )}
      </div>
    </li>
  );
};

export default RecommendationCard;
