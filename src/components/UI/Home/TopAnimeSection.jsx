import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import TopAnimeHomePageCard from "../../../components/card/Home/TopAnimeHomePageCard";

const TopAnimeSection = ({ topAnimeHomeData }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  return (
    <section className="my-6 px-4">
      <div className="flex justify-between my-4">
        <div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-wide text-white">
            <span className="text-[#f47521] mr-2">|</span>
            Top Anime
          </h2>

          <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-400 font-medium tracking-wide">
            The highest ranked anime of all time.
          </p>
        </div>

        <NavLink
          to="/top-animes"
          className={"hover:text-[#f47521] flex items-center"}
        >
          <span className="flex items-center text-sm">
            VIEW ALL <GrFormNext size={23} />
          </span>
        </NavLink>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        onSwiper={(swipe) => {
          setIsBeginning(swipe.isBeginning);
          setIsEnd(swipe.isEnd);
        }}
        onSlideChange={(swipe) => {
          setIsBeginning(swipe.isBeginning);
          setIsEnd(swipe.isEnd);
        }}
        navigation={{ prevEl: ".custom-prev", nextEl: ".custom-next" }}
        breakpoints={{
          // mobile
          0: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          // small tablets
          640: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          // tablets
          768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          // laptop & desktop
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        }}
      >
        {topAnimeHomeData.map((item) => (
          <SwiperSlide key={item.mal_id}>
            <TopAnimeHomePageCard currEle={item} />
          </SwiperSlide>
        ))}

        <button className={`custom-next ${isEnd ? "hidden-arrow" : ""}`}>
          <GrFormNext size={58} />
        </button>
        <button className={`custom-prev ${isBeginning ? "hidden-arrow" : ""}`}>
          <GrFormPrevious size={58} />
        </button>
      </Swiper>
    </section>
  );
};

export default TopAnimeSection;
