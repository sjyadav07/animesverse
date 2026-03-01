import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="bg-black py-12 ">
        {/* ---------section-1----------------- */}
        <div className="max-w-7xl mx-auto px-8  grid sm:grid-cols-3 grid-cols-1 gap-10 ">
          <div className="space-y-3">
            <h1 className="text-white hover:text-[#ff640a] text-2xl font-bold">
              <NavLink to="/">AnimeVerse</NavLink>
            </h1>
            <p className="text-[#6d858c] text-sm">
              Your #1 source for animes, reviews, and entertainment updates.
            </p>
          </div>
          {/* --------------section-2--------------------- */}
          <div className="">
            <h2 className="text-gray-300 text-lg font-semibold mb-3">
              Explore
            </h2>
            <div className="flex flex-col space-y-2 text-[#6d858c]">
              <NavLink to="/home" className="hover:text-white">
                Home
              </NavLink>
              <NavLink to="/seasonal-page" className="hover:text-white">
                Seasonal Animes
              </NavLink>
              <NavLink to="/top-animes" className="hover:text-white">
                Top Anime
              </NavLink>
              <NavLink to="/genres/1/Action" className="hover:text-white">
                Genres
              </NavLink>
            </div>
          </div>
          <div>
            <h2 className="text-gray-300 text-lg font-semibold mb-3">
              Connect
            </h2>
            <div className="flex flex-col space-y-2 space-x-1  sm:flex-col sm:gap-1  text-[#6d858c] ">
              <NavLink
                to="https://github.com/sjyadav07"
                target="_blank"
                className="hover:text-white flex items-center gap-2"
              >
                <FaGithub /> Github
              </NavLink>
              <NavLink
                to="www.linkedin.com/in/sachinyadav-it"
                target="_blank"
                className="hover:text-white flex items-center gap-2"
              >
                <FaLinkedin /> LinkedIn
              </NavLink>
              <NavLink
                to="#"
                className="hover:text-white flex items-center gap-2"
              >
                <FaTwitter /> Twitter
              </NavLink>
            </div>
          </div>
        </div>
        {/* -----section-3----------------------------- */}
        <div className=" border-t border-slate-600 mt-8 pt-4 text-center text-sm text-[#6d858c]">
          <p>
            © {new Date().getFullYear()} AnimeVerse. All rights reserved.
            <span className="text-[#ff640a] mx-2">|</span>
            Developed by{" "}
            <span className="text-[#ff640a] hover:underline cursor-pointer font-medium">
              Sachin Yadav
            </span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
