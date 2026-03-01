const BASE_URL = "https://api.jikan.moe/v4";

// ============================================
// RATE LIMIT HANDLING ONLY (NO CACHE)
// ============================================

const PENDING_REQUESTS = new Map();
const REQUEST_QUEUE = [];
let isProcessing = false;
let lastRequestTime = 0;

// Queue system for rate limiting
const processQueue = async () => {
  if (isProcessing || REQUEST_QUEUE.length === 0) return;

  isProcessing = true;

  while (REQUEST_QUEUE.length > 0) {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    // Ensure 350ms gap between requests (≈ 3 requests per second)
    if (timeSinceLastRequest < 350) {
      await new Promise((r) => setTimeout(r, 350 - timeSinceLastRequest));
    }

    const { url, options, resolve, reject } = REQUEST_QUEUE.shift();

    try {
      lastRequestTime = Date.now();
      const response = await fetch(url);

      if (response.status === 429) {
        console.log(`⏳ Rate limited, waiting 2 seconds...`);
        await new Promise((r) => setTimeout(r, 2000));
        // Add back to queue
        REQUEST_QUEUE.unshift({ url, options, resolve, reject });
      } else {
        const data = await response.json();
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }

    // Small delay between requests
    await new Promise((r) => setTimeout(r, 100));
  }

  isProcessing = false;
};

const queuedFetch = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    REQUEST_QUEUE.push({ url, options, resolve, reject });
    processQueue();
  });
};

// Fetch with retry using queue (NO CACHE)
const fetchWithRetry = async (url, options = {}) => {
  const { retries = 3 } = options;

  // Check if same request is already pending
  if (PENDING_REQUESTS.has(url)) {
    console.log(`⏳ Waiting for pending request: ${url}`);
    return PENDING_REQUESTS.get(url);
  }

  const fetchPromise = (async () => {
    for (let i = 0; i < retries; i++) {
      try {
        console.log(`🌐 Fetching: ${url} (attempt ${i + 1})`);

        // Use queued fetch
        const data = await queuedFetch(url);
        return data;
      } catch (error) {
        console.error(`Attempt ${i + 1} failed:`, error.message);
        if (i === retries - 1) throw error;

        // Exponential backoff
        const waitTime = 1500 * Math.pow(2, i);
        await new Promise((r) => setTimeout(r, waitTime));
      }
    }
  })();

  PENDING_REQUESTS.set(url, fetchPromise);

  try {
    return await fetchPromise;
  } finally {
    setTimeout(() => PENDING_REQUESTS.delete(url), 5000);
  }
};

// ============================================
//  3 API FUNCTIONS
// ============================================

// 1. ANIME DETAILS + TRAILER
export const getAnimeFullById = async (id) => {
  try {
    const data = await fetchWithRetry(`${BASE_URL}/anime/${id}/full`);
    console.log("✅ Details fetched:", data?.data?.title);
    return data?.data;
  } catch (error) {
    console.error("❌ Error fetching anime details:", error);
    return null;
  }
};

// 2. EPISODES LIST
export const getAnimeEpisodes = async (animeId, page = 1) => {
  try {
    const data = await fetchWithRetry(
      `${BASE_URL}/anime/${animeId}/episodes?page=${page}`,
    );

    return {
      data: data?.data || [],
      pagination: data?.pagination || {
        has_next_page: false,
        last_visible_page: 1,
      },
    };
  } catch (error) {
    console.error("❌ Error fetching episodes:", error);
    return {
      data: [],
      pagination: { has_next_page: false, last_visible_page: 1 },
    };
  }
};

// 3. RECOMMENDATIONS
export const getAnimeRecommendations = async (id) => {
  try {
    const data = await fetchWithRetry(
      `${BASE_URL}/anime/${id}/recommendations`,
    );
    return data?.data || [];
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    return [];
  }
};

// ============================================
// MAIN FUNCTION - FETCH  3 APIS
// ============================================

export const getAnimeDetails = async (id) => {
  try {
    console.log("🚀 Fetching anime data for ID:", id);

    // Fetch main details first (this has trailer!)
    const details = await getAnimeFullById(id);

    if (!details) {
      console.error("❌ No details found");
      return null;
    }

    // Fetch episodes and recommendations in parallel
    const [episodesResult, recommendationsResult] = await Promise.allSettled([
      getAnimeEpisodes(id, 1),
      getAnimeRecommendations(id),
    ]);

    const finalData = {
      details,
      episodes:
        episodesResult.status === "fulfilled" ? episodesResult.value.data : [],
      episodePagination:
        episodesResult.status === "fulfilled"
          ? episodesResult.value.pagination
          : { has_next_page: false },
      recommendations:
        recommendationsResult.status === "fulfilled"
          ? recommendationsResult.value
          : [],
    };

    console.log("✅ All data fetched successfully", {
      details: details.title,
      episodes: finalData.episodes.length,
      recommendations: finalData.recommendations.length,
    });

    return finalData;
  } catch (error) {
    console.error("❌ Fatal error:", error);
    return null;
  }
};
