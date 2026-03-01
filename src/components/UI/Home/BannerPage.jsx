import React, { useRef, useState } from "react";
import { FaPlay, FaPlus, FaStar, FaCalendarAlt, FaTv } from "react-icons/fa";
import { GrAdd, GrPlay, GrStar } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const BannerPage = ({ trendingBanner }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const [glow, setGlow] = useState("orange");

  if (!trendingBanner) return null;

  const {
    mal_id,
    title_english,
    title,
    images,
    synopsis,
    score,
    scored_by,
    episodes,
    type,
    aired,
    genres = [],
    studios = [],
  } = trendingBanner;

  //*cursor move effect
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 3;
    const centerY = rect.height / 3;

    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((centerX - x) / centerX) * 5;

    card.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
  `;

    // spread light (not circle)
    card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);

    // dynamic border glow direction
    card.style.boxShadow = `
    ${-rotateY * 2}px ${rotateX * 2}px 0px rgba(224,82,0,0.7)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    card.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString?.from) return "Unknown";
    const date = new Date(dateString.from);
    return date.getFullYear();
  };

  function formatNumber(members) {
    if (members >= 1e9)
      return (members / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    if (members >= 1e6)
      return (members / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    if (members >= 1e3)
      return (members / 1e3).toFixed(1).replace(/\.0$/, "") + "k";

    return String(members);
  }

  return (
    <section className="w-full bg-black py-6 md:py-10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative bg-[#111] rounded-xl overflow-hidden border border-gray-800 min-h-[300px] md:min-h-[350px] transition-all duration-300 ease-out"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={
                images?.webp?.large_image_url || images?.jpg?.large_image_url
              }
              alt={title_english || title}
              className="w-full h-full object-cover opacity-20"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/90 to-black/70" />
          </div>

          {/* Content - FLEX CONTAINER with items-center */}
          <div className="relative h-full flex items-center p-6 md:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-10 w-full">
              {/* Left - Poster (Vertically centered) */}
              <div className="w-36 md:w-44 lg:w-52 xl:w-60 shrink-0">
                <div className="relative overflow-hidden rounded-sm shadow-xl group">
                  <img
                    src={
                      images?.webp?.large_image_url ||
                      images?.jpg?.large_image_url
                    }
                    alt={title_english || title}
                    className="w-full h-auto aspect-2/3 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Rating Badge */}
                  {score && (
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded">
                      <div className="flex items-center gap-1">
                        <GrStar className="text-[#e05200] text-xs" size={18} />
                        <span className="text-white font-bold text-sm">
                          {score.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right - Content (Vertically centered) */}
              <div className="flex-1">
                {/* Title Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    {title_english || title}
                  </h1>

                  {/* Year & Type Badge */}
                  <div className="flex items-center gap-3">
                    {aired?.from && (
                      <div className="flex items-center gap-1 text-gray-300 text-sm">
                        <FaCalendarAlt className="text-xs" />
                        <span>{formatDate(aired)}</span>
                      </div>
                    )}

                    {type && (
                      <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded-full">
                        {type}
                      </span>
                    )}
                  </div>
                </div>

                {/* Info Row */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {/* Sub/Dub Badge */}
                  <span className="px-3 py-1 bg-[#e05200] text-white text-xs font-bold rounded-full">
                    SUB | DUB
                  </span>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2">
                    {genres.slice(0, 2).map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  {/* Studio */}
                  {studios[0] && (
                    <span className="text-gray-400 text-sm">
                      • {studios[0].name}
                    </span>
                  )}
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-5">
                  {episodes && (
                    <div className="flex items-center gap-2">
                      <FaTv className="text-gray-400" />
                      <span className="text-gray-300 text-sm">
                        {episodes} episodes
                      </span>
                    </div>
                  )}

                  {scored_by && (
                    <div className="flex items-center gap-2">
                      <GrStar className="text-gray-400 mb-1 " size={20} />
                      <span className="text-gray-300 text-sm">
                        {formatNumber(scored_by)} ratings
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm md:text-base mb-6 md:mb-8 max-w-3xl line-clamp-2 md:line-clamp-3">
                  {synopsis || "An exciting anime adventure awaits..."}
                </p>

                {/* Buttons Row */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <NavLink
                    to={`/anime/${mal_id}`}
                    className="inline-flex items-center rounded-xs justify-center gap-2 px-6 md:px-8 py-3 hover:bg-[#ff640a] bg-[#e05200] text-black font-semibold transition-colors text-sm md:text-base"
                  >
                    <GrPlay size={18} />
                    <span>START WATCHING</span>
                  </NavLink>

                  <button className="cursor-pointer inline-flex rounded-xs items-center justify-center gap-2 px-6 md:px-8 py-3 bg-transparent border border-gray-600 hover:border-white text-white font-semibold  transition-colors text-sm md:text-base">
                    <GrAdd size={18} />
                    <span>ADD TO LIST</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Gradient Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#e05200] to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default BannerPage;
