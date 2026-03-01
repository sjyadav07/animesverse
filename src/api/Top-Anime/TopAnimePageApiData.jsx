// src/api/Top-Anime/TopAnimePageApiData.js

const topAnimeApiData = async (page) => {
  console.log("PAGE VALUE 👉", page, typeof page);
  try {
    const res = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
    const data = await res.json();

    // Safe check for validation
    if (res.status !== 200 || !data.pagination) {
      console.warn("API returned invalid response:", data);
      return {
        animeList: [],
        hasNextPage: false,
        currentPage: page,
      };
    }

    return {
      animeList: data.data || [],
      hasNextPage: data.pagination?.has_next_page || false,
      currentPage: data.pagination?.current_page || page,
    };
  } catch (error) {
    console.error("Error fetching top anime:", error);
    return {
      animeList: [],
      hasNextPage: false,
      currentPage: page,
    };
  }
};

export default topAnimeApiData;
