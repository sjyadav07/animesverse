import { useState } from "react";
import { FaPlay } from "react-icons/fa";

const EpisodeCard = ({ episode, animeImage, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const episodeNumber = episode.mal_id || index;
  const episodeTitle = episode.title || `Episode ${episodeNumber}`;

  //official episodes
  const handleClick = () => {
    if (episode.url) {
      window.open(episode.url, "_blank");
    }
  };
  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative rounded overflow-hidden bg-[#1e1e1e] aspect-video">
        {/* Episode Image - Using anime poster as fallback */}
        <img
          src={animeImage}
          alt={episodeTitle}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        {/* Episode Number Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-[#f47521] text-white text-xs font-bold rounded">
            EP {episodeNumber}
          </span>
        </div>

        {/* Play Button Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-12 h-12 bg-[#f47521] rounded-full flex items-center justify-center transform group-hover:scale-110 transition shadow-lg">
            <FaPlay className="text-white text-lg ml-1" />
          </div>
        </div>

        {/* Episode Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h4 className="text-white text-sm font-semibold line-clamp-2">
            {episodeTitle}
          </h4>
          {episode.aired && (
            <p className="text-gray-300 text-xs mt-1">
              {new Date(episode.aired).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
