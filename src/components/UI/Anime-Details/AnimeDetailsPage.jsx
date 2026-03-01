import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { getAnimeDetails } from "../../../api/Anime-Details/GetAnimeDetails";
import HeroSection from "./HeroSection";
import EpisodeCard from "../../card/Anime-Details/EpisodeCard";
import RecommendationCard from "../../card/Anime-Details/RecommendationCard";
import AnimeLoading from "../../Layout/AnimeLoading";

const AnimeDetailsPage = () => {
  const { id } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refs for Swiper navigation
  const episodesPrevRef = useRef(null);
  const episodesNextRef = useRef(null);
  const recommendationsPrevRef = useRef(null);
  const recommendationsNextRef = useRef(null);

  useEffect(() => {
    const loadAnime = async () => {
      setLoading(true);
      const data = await getAnimeDetails(id);
      setAnimeData(data);
      setLoading(false);
    };
    loadAnime();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <AnimeLoading />;
  }

  if (!animeData || !animeData.details) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-6">Anime not found</p>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-[#f47521] text-white rounded-lg hover:bg-[#f47521]/90 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { details, episodes = [], recommendations = [] } = animeData;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero Section - Alag component mein */}
      <HeroSection details={details} />

      {/* EPISODES SECTION */}
      {episodes.length > 0 && (
        <section className="container mx-auto px-4 py-7 relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Episodes</h2>
          </div>

          {/* Arrow buttons */}
          <button
            className={`custom-prev-episodes hover:text-gray-200 absolute left-2 top-1/2 transform -translate-y-1/2 z-10 hidden-arrow`}
            style={{ left: "1.1rem", top: "63%" }}
          >
            <GrFormPrevious size={50} className="cursor-pointer" />
          </button>
          <button
            className={`custom-next-episodes cursor-pointer hover:text-gray-200 absolute right-2 top-1/2 transform -translate-y-1/2 z-10`}
            style={{ right: "1.1rem", top: "63%" }}
          >
            <GrFormNext size={50} className="cursor-pointer" />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2}
            navigation={{
              prevEl: ".custom-prev-episodes",
              nextEl: ".custom-next-episodes",
            }}
            onInit={(swiper) => {
              const prevBtn = document.querySelector(".custom-prev-episodes");
              const nextBtn = document.querySelector(".custom-next-episodes");

              if (prevBtn) {
                if (swiper.isBeginning) prevBtn.classList.add("hidden-arrow");
                else prevBtn.classList.remove("hidden-arrow");
              }
              if (nextBtn) {
                if (swiper.isEnd) nextBtn.classList.add("hidden-arrow");
                else nextBtn.classList.remove("hidden-arrow");
              }
            }}
            onSlideChange={(swiper) => {
              const prevBtn = document.querySelector(".custom-prev-episodes");
              const nextBtn = document.querySelector(".custom-next-episodes");

              if (prevBtn) {
                if (swiper.isBeginning) prevBtn.classList.add("hidden-arrow");
                else prevBtn.classList.remove("hidden-arrow");
              }
              if (nextBtn) {
                if (swiper.isEnd) nextBtn.classList.add("hidden-arrow");
                else nextBtn.classList.remove("hidden-arrow");
              }
            }}
            breakpoints={{
              0: { slidesPerView: 2, slidesPerGroup: 2 },
              640: { slidesPerView: 3, slidesPerGroup: 3 },
              768: { slidesPerView: 4, slidesPerGroup: 4 },
              1024: { slidesPerView: 5, slidesPerGroup: 5 },
            }}
            className="episodes-swiper"
          >
            {episodes.map((episode, index) => (
              <SwiperSlide key={episode.mal_id || index}>
                <EpisodeCard
                  episode={episode}
                  animeImage={details.images.jpg.image_url}
                  index={index + 1}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* RECOMMENDATIONS SECTION */}
      {recommendations.length > 0 && (
        <section className="container mx-auto px-4 py-12 relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">You May Also Like</h2>
          </div>

          {/* Arrow buttons */}
          <button
            className={`custom-prev-reco hover:text-gray-200 absolute left-2 top-1/2 transform -translate-y-1/2 z-10 hidden-arrow`}
            style={{ left: "1.1rem", top: "55%" }}
          >
            <GrFormPrevious size={50} className="cursor-pointer" />
          </button>
          <button
            className={`custom-next-reco cursor-pointer hover:text-gray-200 absolute right-2 top-1/2 transform -translate-y-1/2 z-10`}
            style={{ right: "1.1rem", top: "55%" }}
          >
            <GrFormNext size={50} className="cursor-pointer" />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2}
            navigation={{
              prevEl: ".custom-prev-reco",
              nextEl: ".custom-next-reco",
            }}
            onInit={(swiper) => {
              const prevBtn = document.querySelector(".custom-prev-reco");
              const nextBtn = document.querySelector(".custom-next-reco");

              if (prevBtn) {
                if (swiper.isBeginning) prevBtn.classList.add("hidden-arrow");
                else prevBtn.classList.remove("hidden-arrow");
              }
              if (nextBtn) {
                if (swiper.isEnd) nextBtn.classList.add("hidden-arrow");
                else nextBtn.classList.remove("hidden-arrow");
              }
            }}
            onSlideChange={(swiper) => {
              const prevBtn = document.querySelector(".custom-prev-reco");
              const nextBtn = document.querySelector(".custom-next-reco");

              if (prevBtn) {
                if (swiper.isBeginning) prevBtn.classList.add("hidden-arrow");
                else prevBtn.classList.remove("hidden-arrow");
              }
              if (nextBtn) {
                if (swiper.isEnd) nextBtn.classList.add("hidden-arrow");
                else nextBtn.classList.remove("hidden-arrow");
              }
            }}
            breakpoints={{
              0: { slidesPerView: 2, slidesPerGroup: 2 },
              640: { slidesPerView: 3, slidesPerGroup: 3 },
              768: { slidesPerView: 4, slidesPerGroup: 4 },
              1024: { slidesPerView: 5, slidesPerGroup: 5 },
            }}
          >
            {recommendations.map((rec) => (
              <SwiperSlide key={rec.entry.mal_id}>
                <RecommendationCard data={rec.entry} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </div>
  );
};

export default AnimeDetailsPage;
