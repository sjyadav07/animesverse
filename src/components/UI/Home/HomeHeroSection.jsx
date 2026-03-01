import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaInfoCircle, FaPlay } from "react-icons/fa";
import { GrFormNext, GrFormPrevious, GrPlay } from "react-icons/gr";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { NavLink } from "react-router-dom";

const HeroSection = ({ banner }) => {
  return (
    <section className="relative w-full h-[75vh] sm:h-[80vh] md:h-[85vh] overflow-hidden bg-black">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        className="h-full hero-swiper"
      >
        {banner.map((item) => (
          <SwiperSlide key={item.mal_id} className="relative h-full">
            <img
              src={item.images.webp.large_image_url}
              alt={item.title_english}
              className="absolute inset-0 w-full h-full object-cover object object-center "
            />

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/25 to-transparent" />
            </div>

            <div className="relative z-10 h-full flex items-end md:ml-5 md:pb-5">
              <div className="w-full max-w-xl px-4 sm:px-8 md:px-16 pb-14 sm:pb-20">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold">
                  {item.title_english}
                </h1>

                <p className="mt-3 text-[#C7C7C7] line-clamp-3">
                  {item.synopsis}
                </p>

                <div className="mt-5 flex gap-3">
                  <button className="hover:bg-[#ff640a] bg-[#e05200] cursor-pointer px-5 py-2 rounded-xs text-black ">
                    <NavLink
                      to="/"
                      className={"font-bold flex items-center gap-2"}
                    >
                      <GrPlay size={18} />
                      Start Watching
                    </NavLink>
                  </button>

                  <button className="border cursor-pointer border-white/30 px-5 py-2.5 rounded-xs flex items-center gap-2">
                    <FaInfoCircle /> More Info
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <button className="custom-next">
          <GrFormNext size={50} />
        </button>
        <button className="custom-prev">
          <GrFormPrevious size={50} />
        </button>
      </Swiper>
    </section>
  );
};

export default HeroSection;
