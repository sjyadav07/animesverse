import React, { useEffect, useState } from "react";

const AnimeLoading = ({ dataReady, minDuration = 2000 }) => {
  const [videoReady, setVideoReady] = useState(false);
  const [timeDone, setTimeDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeDone(true);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  const shouldHide = dataReady && videoReady && timeDone;
  if (shouldHide) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[99999]">
      <video
        src="/videos/sharingan-eye-anime-loader.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-contain"
        onLoadedData={() => setVideoReady(true)}
      />
    </div>
  );
};

export default AnimeLoading;
