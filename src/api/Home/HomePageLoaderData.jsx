// src/api/Home/HomePageLoaderData.jsx

const HomePageLoaderData = async () => {
  // 1. CACHE CHECK (3 hours)
  const CACHE_KEY = "animeverse_homepage_data";
  const CACHE_EXPIRY = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

  const cachedData = localStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    const isExpired = Date.now() - timestamp > CACHE_EXPIRY;

    if (!isExpired) {
      console.log("✅ Using cached homepage data");
      return data;
    }
  }

  // 2. ALL API URLs (only essential ones)
  const apiUrls = [
    {
      key: "trending",
      url: "https://api.jikan.moe/v4/top/anime?filter=airing",
    },
    { key: "upcoming", url: "https://api.jikan.moe/v4/seasons/upcoming" },
    {
      key: "MostPopular",
      url: "https://api.jikan.moe/v4/top/anime?filter=bypopularity",
    },
    {
      key: "TopAnime",
      url: "https://api.jikan.moe/v4/top/anime?order_by=score&sort=desc",
    },
    { key: "seasonal", url: "https://api.jikan.moe/v4/seasons/now" },
    {
      key: "actionPicks",
      url: "https://api.jikan.moe/v4/anime?genres=1&order_by=score&sort=desc",
    },
  ];

  try {
    console.log("🔄 Fetching fresh homepage data...");

    // 3. STAGGERED FETCH (avoid rate limit)
    const results = {};

    for (let i = 0; i < apiUrls.length; i++) {
      const { key, url } = apiUrls[i];

      // Add delay between requests (300ms gap)
      if (i > 0) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      try {
        const response = await fetch(url);

        if (!response.ok) {
          console.warn(`⚠️ Failed for ${key}:`, response.status);
          results[key] = [];
          continue;
        }

        const data = await response.json();
        results[key] = data.data || [];

        console.log(`✅ ${key} loaded: ${results[key].length} items`);
      } catch (error) {
        console.error(`❌ Error fetching ${key}:`, error);
        results[key] = [];
      }
    }

    // 4. PREPARE FINAL DATA
    const finalData = {
      trending: results.trending || [],
      upcoming: results.upcoming || [],
      MostPopular: results.MostPopular || [],
      TopAnime: results.TopAnime || [],
      seasonal: results.seasonal || [],
      actionPicks: results.actionPicks || [],
    };

    // 5. SAVE TO CACHE
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: finalData,
        timestamp: Date.now(),
      }),
    );

    console.log("✅ All homepage data loaded and cached");
    return finalData;
  } catch (mainError) {
    console.error("❌ Home loader error:", mainError);

    // 6. FALLBACK TO CACHED DATA IF AVAILABLE
    if (cachedData) {
      const { data } = JSON.parse(cachedData);
      console.log("🔄 Falling back to cached data");
      return data;
    }

    // 7. EMPTY FALLBACK
    return {
      trending: [],
      upcoming: [],
      MostPopular: [],
      TopAnime: [],
      seasonal: [],
      actionPicks: [],
    };
  }
};

export default HomePageLoaderData;
