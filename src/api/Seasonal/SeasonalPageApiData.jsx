import React from "react";

const seasonalPageApiData = async (page) => {
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/seasons/now?page=${page}`,
    );
    const data = await res.json();
    // console.log(data);
    return {
      animeList: data.data,
      hasNextPage: data.pagination.has_next_page,
      currentPage: data.pagination.current_page,
    };
  } catch (error) {
    console.error(error);
    return {
      animeList: [],
      hasNextPage: false,
      currentPage: page,
    };
  }
};

export default seasonalPageApiData;
