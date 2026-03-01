import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const VideoPlayer = ({ trailerUrl, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!trailerUrl) return null;

  // Clean YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";

    let videoId = "";
    if (url.includes("youtube.com/embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    }

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=0&disablekb=1&loop=1&playlist=${videoId}`
      : url;
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Simple Header - sirf close button */}
              <div className="flex items-center justify-end mb-4 px-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 bg-[#1e1e1e] hover:bg-[#2a2a2a] rounded-full transition"
                  title="Close"
                >
                  <FaTimes className="text-white" />
                </button>
              </div>

              {/* Video Container - LOOP KE SAATH */}
              <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={getYouTubeEmbedUrl(trailerUrl)}
                  title="Trailer"
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media; picture-in-picture"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoPlayer;
