import React from "react";
import { NavLink, useRouteError } from "react-router-dom";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import errorimg from "../../assets/error-page.png";

const ErrorPage = () => {
  const error = useRouteError(); //=> this is the one "react-router hook" which gives more details about the error message

  // console.log(error);

  return (
    <div className="min-h-screen bg-[#020617] md:flex md:justify-center md:items-center flex items-center justify-end md:pl-100 px-4 relative">
      <div className="text-center max-w-xl relative z-10">
        {/* 404 TEXT */}
        <h1
          className="text-8xl md:text-9xl font-extrabold 
          text-transparent bg-clip-text 
          bg-linear-to-r from-cyan-400 to-blue-500"
        >
          404
        </h1>

        {/* TITLE */}
        <h2 className="mt-6 md:mt-7 text-3xl md:text-4xl font-semibold sm:text-gray-200 text-gray-400">
          Lost in the Anime Multiverse
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-6 sm:mt-7 text-gray-300 sm:text-gray-400 text-lg md:text-base">
          This episode doesn’t exist or was lost between dimensions.
          <span className="text-lg text-blue-400"> {error.statusText}.</span>
        </p>

        {/* BUTTON */}
        <div className="mt-8 flex justify-center">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-6 py-3
            rounded-lg border border-blue-500 text-blue-400
            hover:bg-blue-500 hover:text-white
            transition duration-300
            shadow-md hover:shadow-blue-500/40 text-xl font-semibold"
          >
            <FaHome size={24} />
            Back to Home
          </NavLink>
        </div>
      </div>

      {/* ANIME EXPLORER IMAGE */}
      <img
        src={errorimg}
        alt="Lost Anime Explorer"
        className="absolute top-0 left-0 w-full h-full object-cover md:w-[45%] md:h-full md:object-cover z-0"
      />
    </div>
  );
};

export default ErrorPage;
