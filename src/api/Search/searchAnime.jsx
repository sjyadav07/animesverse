const BASE_URL = "https://api.jikan.moe/v4";

export const searchAnime = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`,
    );
    const data = await response.json();
    return {
      results: data.data || [],
      pagination: data.pagination || {},
    };
  } catch (error) {
    console.error("Search error:", error);
    return { results: [], pagination: {} };
  }
};
