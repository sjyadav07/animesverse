import React, { useEffect, useRef, useState } from "react";
import TopAnimesCard from "../../../components/card/Top-Anime/TopAnimesCard";
import topAnimeApiData from "../../../api/Top-Anime/TopAnimePageApiData";

// delay function (optional)
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const TopAnime = () => {
  // ========================== STATES =======================
  const [topAnimeList, setTopAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  // ===== REFS =======================
  const observerRef = useRef(null);
  const isFetchingRef = useRef(false);
  const hasMountedRef = useRef(false);

  // ===== API FETCH FUNCTION =====================
  const loadTopAnimes = async () => {
    if (isFetchingRef.current || !hasNextPage) return;

    isFetchingRef.current = true;
    setLoading(true);

    await delay(500); // optional small delay

    const res = await topAnimeApiData(page); // fetch top anime page wise

    setTopAnimeList((prev) => {
      const ids = new Set(prev.map((a) => a.mal_id));
      const unique = res.animeList.filter((a) => !ids.has(a.mal_id));
      return [...prev, ...unique];
    });

    setHasNextPage(res.hasNextPage);
    setPage((prev) => prev + 1);

    setLoading(false);
    isFetchingRef.current = false;
  };

  // ===== FIRST LOAD ====================================
  useEffect(() => {
    loadTopAnimes(); // first page load
  }, []);

  // ===== INTERSECTION OBSERVER (INFINITE SCROLL) ======
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingRef.current) {
          loadTopAnimes();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.2,
      },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [topAnimeList.length, hasNextPage]);

  // ===== SCROLL TO TOP ON LOAD =========================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <section className="py-8 bg-black min-h-screen">
      <div className="mx-auto max-w-[1050px] px-4">
        <h1 className="text-white text-2xl font-semibold mb-6">
          Top Animes List
        </h1>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10 justify-items-center">
          {topAnimeList.map((topAnimes, index) => (
            <TopAnimesCard
              key={topAnimes.mal_id + "-" + index}
              topAnimes={topAnimes}
            />
          ))}

          {/* Skeleton loader */}
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <li
                key={`skeleton-${i}`}
                className="w-[150px] animate-pulse [animation-duration:2.5s]"
              >
                <div className="aspect-2/3 w-full bg-linear-to-br from-[#1f2933] via-[#111827] to-[#1f2933] rounded-md" />
                <div className="h-3 bg-[#1f2933] rounded mt-2" />
                <div className="h-3 bg-[#1f2933] rounded mt-1 w-3/4" />
              </li>
            ))}
        </ul>
      </div>

      {hasNextPage && <div ref={observerRef} className="h-10" />}
    </section>
  );
};

export default TopAnime;
