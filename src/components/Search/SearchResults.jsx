import { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { searchAnime } from "../../api/Search/searchAnime";
import AnimeLoading from "../Layout/AnimeLoading";
import { GrAdd, GrBookmark, GrPlay, GrStar } from "react-icons/gr";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const data = await searchAnime(query, page);
      setResults(data.results);
      setPagination(data.pagination);
      setLoading(false);
    };

    if (query) {
      fetchResults();
    }
  }, [query, page]);

  // Function to convert views
  const showViews = (members) => {
    if (!members) return "0";
    if (members >= 1e9)
      return (members / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    if (members >= 1e6)
      return (members / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    if (members >= 1e3)
      return (members / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
    return String(members);
  };

  if (loading) return <AnimeLoading />;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Search Results for "{query}"
        </h1>

        {results.length === 0 ? (
          <p className="text-gray-400">No results found</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {results.map((anime) => {
              const {
                mal_id,
                title_english,
                title,
                images,
                episodes,
                members,
                score,
                synopsis,
                genres = [],
              } = anime;

              return (
                <li
                  key={mal_id}
                  className="w-full relative select-none cursor-pointer hover:detailed-info list-none"
                >
                  {/* Poster */}
                  <div className="w-full aspect-2/3 bg-[#111] ">
                    <img
                      src={
                        images?.webp?.large_image_url ||
                        images?.jpg?.large_image_url
                      }
                      alt={title_english || title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="mt-2.5">
                    <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2">
                      {title_english || title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">
                      {genres?.length > 0
                        ? genres
                            .slice(0, 2)
                            .map((g) => g.name)
                            .join(" | ")
                        : "Anime"}
                    </p>
                  </div>

                  {/* Overlay detailed-info  */}
                  <div className="detailed-info">
                    <div className="m-3">
                      <div>
                        <h3 className="text-md font-bold text-white">
                          {title_english || title}
                        </h3>
                      </div>

                      <div className="text-[#8c8c8c] text-sm font-semibold mt-3">
                        <p className="text-[#bbbbbb] flex gap-1">
                          {score || "NR"} <GrStar size={18} />
                          <span>{`(${showViews(members)})`}</span>
                        </p>
                        <p className="pt-2 pb-3">{episodes || "?"} Episodes</p>
                      </div>

                      <div className="text-sm">
                        <p className="line-clamp-6 leading-relaxed tracking-normal text-white">
                          {synopsis || "No synopsis available."}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-6 text-[#f47521] absolute bottom-4 left-4">
                      <NavLink to={`/anime/${mal_id}`}>
                        <button className="cursor-pointer hover:scale-110 transition">
                          <GrPlay size={22} />
                        </button>
                      </NavLink>
                      <button className="cursor-pointer hover:scale-110 transition">
                        <GrBookmark size={22} />
                      </button>
                      <button className="cursor-pointer hover:scale-110 transition">
                        <GrAdd size={22} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Pagination (optional) */}
        {pagination?.last_visible_page > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-[#1e1e1e] rounded cursor-pointer disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {page} of {pagination.last_visible_page}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === pagination.last_visible_page}
              className="px-4 py-2 bg-[#1e1e1e] rounded cursor-pointer disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
