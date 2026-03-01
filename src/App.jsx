// 📁 src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout
import AppLayout from "./components/Layout/AppLayout";

// Pages / UI
import Home from "./components/UI/Home/Home";
import TopAnime from "./components/UI/Top-Anime/TopAnime";
import Genres from "./components/UI/Genres/Genres";
import SeasonalPage from "./components/UI/Seasonal-Page/SeasonalPage";
import GenreAnimePage from "./components/UI/Genres/GenreAnimePage";
import AnimeListPage from "./components/UI/Home/AnimeListPage";
import ErrorPage from "./components/UI/ErrorPage";

// Loaders
import HomePageLoaderData from "./api/Home/HomePageLoaderData";
import AnimeDetailsPage from "./components/UI/Anime-Details/AnimeDetailsPage";
import SearchResults from "./components/Search/SearchResults";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: HomePageLoaderData,
      },
      {
        path: "home",
        element: <Home />,
        loader: HomePageLoaderData,
      },
      {
        path: "seasonal-page",
        element: <SeasonalPage />,
      },
      {
        path: "top-animes",
        element: <TopAnime />,
      },
      {
        path: "genres",
        element: <Genres />,
      },
      {
        path: "genres/:genreId/:genreName",
        element: <GenreAnimePage />,
      },
      {
        path: "anime-list/:type",
        element: <AnimeListPage />,
      },
      {
        path: "anime/:id",
        element: <AnimeDetailsPage />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
