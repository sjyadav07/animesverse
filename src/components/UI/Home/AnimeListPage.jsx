import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SeasonalPageCardList from "../../card/Seasonal/SeasonalPageCardList";

// optional delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const AnimeListPage = () => {
  const { type } = useParams(); // "most-popular", "action-picks", "top-anime"
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);
  const isFetchingRef = useRef(false);

  // --- API fetch per type ---
  const getAnimeListByType = async (type, page) => {
    let url = "";

    switch (type) {
      case "trending":
        // trending = top anime airing
        url = `https://api.jikan.moe/v4/top/anime?filter=airing&page=${page}`;
        break;
      case "upcoming":
        // upcoming = upcoming season
        url = `https://api.jikan.moe/v4/seasons/upcoming?page=${page}`;
        break;
      case "seasonal-now":
        // seasonal = current season
        url = `https://api.jikan.moe/v4/seasons/now?page=${page}`;
        break;
      case "most-popular":
        // most popular = top anime by popularity
        url = `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${page}`;
        break;
      case "top-anime":
        // top rated = top anime by score
        url = `https://api.jikan.moe/v4/top/anime?order_by=score&sort=desc&page=${page}`;
        break;
      case "action-picks":
        // action genre popular
        url = `https://api.jikan.moe/v4/anime?genres=1&order_by=score&sort=desc&page=${page}`;
        break;
      default:
        // fallback = all anime
        url = `https://api.jikan.moe/v4/anime?page=${page}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      return {
        animeList: data.data ?? [],
        hasNextPage: data.pagination?.has_next_page ?? false,
      };
    } catch (err) {
      console.error("API fetch error:", err);
      return { animeList: [], hasNextPage: false };
    }
  };

  // --- Load anime ---
  const loadAnimes = async () => {
    if (isFetchingRef.current || !hasNextPage) return;

    isFetchingRef.current = true;
    setLoading(true);

    await delay(300); // optional delay

    const res = await getAnimeListByType(type, page);

    setAnimeList((prev) => {
      const ids = new Set(prev.map((a) => a.mal_id));
      const unique = res.animeList.filter((a) => !ids.has(a.mal_id));
      return [...prev, ...unique];
    });

    setHasNextPage(res.hasNextPage);
    setPage((prev) => prev + 1);

    setLoading(false);
    isFetchingRef.current = false;
  };

  // --- Reset on type change ---
  useEffect(() => {
    setAnimeList([]);
    setPage(1);
    setHasNextPage(true);
    loadAnimes();
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [type]);

  // --- Infinite scroll observer ---
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingRef.current) {
          loadAnimes();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.2 },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [animeList, hasNextPage]);

  return (
    <section className="py-8 bg-black min-h-screen">
      <div className="mx-auto max-w-[1050px] px-4">
        <h1 className="text-white text-2xl font-semibold mb-6">
          {type.replace("-", " ").charAt(0).toUpperCase() + type.slice(1)}{" "}
          Animes
        </h1>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10 justify-items-center">
          {animeList.map((item, index) => (
            <SeasonalPageCardList
              key={item.mal_id + "-" + index}
              currEle={item}
            />
          ))}

          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <li key={`skeleton-${i}`} className="w-[150px] animate-pulse">
                <div className="aspect-2/3 w-full bg-gray-800 rounded-md" />
                <div className="h-3 bg-gray-800 rounded mt-2" />
                <div className="h-3 bg-gray-800 rounded mt-1 w-3/4" />
              </li>
            ))}
        </ul>
      </div>

      {hasNextPage && <div ref={observerRef} className="h-10" />}
    </section>
  );
};

export default AnimeListPage;
