import { useState } from "react";
import { motion } from "framer-motion";
import {
  GrPlay,
  GrAdd,
  GrCheckmark,
  GrBookmark,
  GrStar,
  GrStarHalf,
  GrClock,
  GrCalendar,
  GrVideo,
  GrMonitor,
} from "react-icons/gr";
import VideoPlayer from "./VideoPlayer";

const HeroSection = ({ details }) => {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper function to render star rating
  const renderStars = (score) => {
    if (!score) return null;

    const stars = [];
    const rating = score / 2; // 8.72/2 = 4.36

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        // Full star - poora orange
        stars.push(<GrStar size={20} key={i} className="text-[#f47521]" />);
      } else if (rating >= i && rating < i + 1) {
        // Half star - aadha orange, aadha gray nahi, poora half orange
        stars.push(<GrStarHalf size={20} key={i} className="text-[#f47521]" />);
      } else {
        // Empty star - gray
        stars.push(<GrStar size={20} key={i} className="text-gray-500" />);
      }
    }

    return stars;
  };

  // Format members count
  const formatNumber = (num) => {
    if (!num) return "N/A";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // Check if synopsis needs a Read More button
  const needsReadMore = details.synopsis && details.synopsis.length > 250;
  const displaySynopsis = isExpanded
    ? details.synopsis
    : details.synopsis?.slice(0, 250) + (needsReadMore ? "..." : "");

  return (
    <div className="relative">
      {/* Backdrop with gradient */}
      <div className="absolute inset-0 h-[80vh] overflow-hidden">
        <img
          src={details.images.jpg.large_image_url}
          alt="poster-img"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0f0f0f] via-transparent to-transparent" />
      </div>

      {/* Hero Content  */}
      <div className="relative container mx-auto px-6  pt-18 pb-8 lg:pl-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-64 lg:w-72 shrink-0 mx-auto lg:mx-0"
          >
            <div className="relative group  ">
              <img
                src={details.images.jpg.large_image_url}
                alt={details.title}
                className="w-full h-full aspect-2/3 cursor-pointer shadow-2xl shadow-orange-500/10"
              />
              {details.trailer?.embed_url && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <VideoPlayer trailerUrl={details.trailer.embed_url}>
                    <button className="w-16 h-16 bg-[#f47521] cursor-pointer rounded-full flex items-center justify-center transform hover:scale-110 transition">
                      <GrPlay className="text-white text-2xl ml-1" />
                    </button>
                  </VideoPlayer>
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            {/* Title - Ab bookmark yahan nahi hai */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                {details.title}
              </h1>
              {(details.title_japanese || details.title_english) && (
                <p className="text-gray-400 text-lg">
                  {details.title_japanese}
                  {details.title_english &&
                    details.title_english !== details.title &&
                    ` • ${details.title_english}`}
                </p>
              )}
            </div>

            {/* Rating & Quick Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-6">
              {details.score && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 ">
                    {renderStars(details.score)}
                  </div>
                  <span className="text-white font-semibold text-md">
                    {details.score}/10
                  </span>
                </div>
              )}

              {details.rank && (
                <div className="flex items-center gap-1 text-gray-300">
                  <span className="text-[#f47521] font-bold">#</span>
                  <span>{details.rank} Rank</span>
                </div>
              )}

              {details.popularity && (
                <div className="flex items-center gap-1 text-gray-300">
                  <span className="text-[#f47521] font-bold">#</span>
                  <span>{details.popularity} Popularity</span>
                </div>
              )}
            </div>

            {/* Action Buttons - Bookmark yahan aaya Watch aur Add ke bich */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              {details.trailer?.embed_url && (
                <VideoPlayer trailerUrl={details.trailer.embed_url}>
                  <button className="px-7 py-3 cursor-pointer hover:bg-[#ff640a] bg-[#e05200] rounded-xs font-semibold flex items-center gap-2 transition">
                    <GrPlay size={18} /> Watch Trailer
                  </button>
                </VideoPlayer>
              )}

              {/*  Bookmark button  */}
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="px-3 py-3 cursor-pointer bg-none border-2 border-[#f47521] rounded-xs transition group"
                title={
                  isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
                }
              >
                <GrBookmark size={22} className={"text-[#f47521]"} />
              </button>

              <button
                onClick={() => setInWatchlist(!inWatchlist)}
                className={`px-7 py-3 cursor-pointer rounded-xs font-semibold flex items-center gap-2 transition ${
                  inWatchlist
                    ? "bg-[#e05200] hover:bg-[#ff640a]/90"
                    : "bg-[#1e1e1e] hover:bg-[#2a2a2a]"
                }`}
              >
                {inWatchlist ? <GrCheckmark size={18} /> : <GrAdd size={18} />}
                {inWatchlist ? "In Watchlist" : "Add to List"}
              </button>
            </div>

            {/* Synopsis with Read More/Less */}
            {details.synopsis && (
              <div className="mt-8 max-w-3xl">
                <h3 className="text-lg font-semibold mb-3">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed">
                  {displaySynopsis}
                </p>
                {needsReadMore && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#f47521] hover:text-[#f47521]/80 text-sm font-medium mt-2 transition cursor-pointer hover:underline"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
            )}

            {/* Metadata Chips */}
            <div className="flex flex-wrap gap-3 mt-6">
              {details.type && (
                <span className="px-4 py-2 bg-[#1e1e1e] rounded-lg text-sm font-medium flex items-center gap-1">
                  <GrMonitor className="text-[#f47521]" />
                  {details.type}
                </span>
              )}
              {details.episodes && (
                <span className="px-4 py-2 bg-[#1e1e1e] rounded-lg text-sm font-medium flex items-center gap-1">
                  <GrVideo className="text-[#f47521]" />
                  {details.episodes} Episodes
                </span>
              )}
              {details.status && (
                <span className="px-4 py-2 bg-[#1e1e1e] rounded-lg text-sm font-medium">
                  {details.status}
                </span>
              )}
              {details.season && details.year && (
                <span className="px-4 py-2 bg-[#1e1e1e] rounded-lg text-sm font-medium flex items-center gap-1">
                  <GrCalendar className="text-[#f47521]" />
                  {details.season} {details.year}
                </span>
              )}
              {details.duration && (
                <span className="px-4 py-2 bg-[#1e1e1e] rounded-lg text-sm font-medium flex items-center gap-1">
                  <GrClock className="text-[#f47521]" />
                  {details.duration}
                </span>
              )}
            </div>

            {/* Genres */}
            {details.genres?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {details.genres.map((genre) => (
                  <span
                    key={genre.mal_id}
                    className="px-3 py-1 bg-[#1e1e1e] text-sm rounded-lg hover:bg-[#2a2a2a] cursor-pointer transition"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Additional Info Row */}
            <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-400">
              {details.studios?.length > 0 && (
                <div>
                  <span className="text-gray-500">Studio:</span>{" "}
                  {details.studios.map((s) => s.name).join(", ")}
                </div>
              )}
              {details.source && (
                <div>
                  <span className="text-gray-500">Source:</span>{" "}
                  {details.source}
                </div>
              )}
              {details.rating && (
                <div>
                  <span className="text-gray-500">Rating:</span>{" "}
                  {details.rating}
                </div>
              )}
              {details.members && (
                <div>
                  <span className="text-gray-500">Members:</span>{" "}
                  {formatNumber(details.members)}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
