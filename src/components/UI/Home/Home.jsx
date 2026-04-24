import React, { useEffect, useState, useMemo } from "react";
import AnimeLoading from "../../Layout/AnimeLoading";

import HomeHeroSection from "./HomeHeroSection";
import SeasonalSection from "./SeasonalSection";
import TopAnimeSection from "./TopAnimeSection";
import BannerPage from "./BannerPage";
import MostPopularAnimes from "./MostPopularAnimes";
import TrendingHomeAnime from "./TrendingHomeAnime";
import UpcomingAnimeData from "./UpcomingAnimeData";
import ActionPicksHomeData from "./ActionPicksHomeData";

import HomePageLoaderData from "../../../api/Home/HomePageLoaderData";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const result = await HomePageLoaderData();

        setData(result);
      } catch {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !data) return <AnimeLoading />;

  const { trending, upcoming, seasonal, actionPicks, TopAnime, MostPopular } =
    data;

  // Remove duplicates
  const uniqueTrendingAnimes = Array.from(
    new Map(trending.map((a) => [a.mal_id, a])).values(),
  );
  const uniqueUpcomingAnimes = Array.from(
    new Map(upcoming.map((a) => [a.mal_id, a])).values(),
  );
  const uniqueSeasonal = Array.from(
    new Map(seasonal.map((a) => [a.mal_id, a])).values(),
  );
  const uniqueActionPicks = Array.from(
    new Map(actionPicks.map((a) => [a.mal_id, a])).values(),
  );
  const uniqueTopAnime = Array.from(
    new Map(TopAnime.map((a) => [a.mal_id, a])).values(),
  );
  const uniqueMostPopularAnimes = Array.from(
    new Map(MostPopular.map((a) => [a.mal_id, a])).values(),
  );

  // DIFFERENT BANNERS FOR DIFFERENT SECTIONS
  // 1. Main banner (after trending) - Use trending[0]
  const mainBanner = uniqueTrendingAnimes[1];

  // 2. Main banner (after trending) - Use trending[0]
  const secBanner = uniqueActionPicks[3];

  // 3. Mid banner (after seasonal) - Use MostPopular[2]
  const midBanner = uniqueMostPopularAnimes[8] || uniqueTrendingAnimes[2];

  // 4. Bottom banner (after TopAnime) - Use TopAnime[1]
  const bottomBanner = uniqueTopAnime[0] || uniqueMostPopularAnimes[8];

  // Slice data for sections
  const seasonalData = uniqueSeasonal.slice(0, 25);
  const topAnimeHomeData = uniqueTopAnime.slice(0, 25);
  const mostPopularAnimeHomeData = uniqueMostPopularAnimes.slice(0, 25);
  const banner = uniqueTrendingAnimes.slice(1, 6); // For hero section

  return (
    <div className="bg-black text-white overflow-hidden">
      <HomeHeroSection banner={banner} />

      <TrendingHomeAnime trendingAnimes={uniqueTrendingAnimes} />

      <SeasonalSection seasonalData={seasonalData} />
      {/* FIRST BANNER - After Trending */}
      {mainBanner && <BannerPage trendingBanner={mainBanner} />}

      <ActionPicksHomeData actionPicks={uniqueActionPicks} />

      {/* second BANNER - After Trending */}
      {secBanner && <BannerPage trendingBanner={secBanner} />}

      <UpcomingAnimeData UpcomingAnimes={uniqueUpcomingAnimes} />

      {/* third BANNER - After Seasonal */}
      {midBanner && (
        <div className="my-12">
          <BannerPage trendingBanner={midBanner} />
        </div>
      )}
      <MostPopularAnimes mostPopularAnimeHomeData={mostPopularAnimeHomeData} />
      {/* fourth BANNER - After TopAnime */}
      {bottomBanner && (
        <div className="my-12">
          <BannerPage trendingBanner={bottomBanner} />
        </div>
      )}
      <TopAnimeSection topAnimeHomeData={topAnimeHomeData} />
    </div>
  );
};

export default Home;
