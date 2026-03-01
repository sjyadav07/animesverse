const GetGenreAnime = async (
  genreId,
  page = 1,
  orderBy = "popularity",
  type = "all",
) => {
  let url = `https://api.jikan.moe/v4/anime?page=${page}&order_by=${orderBy}`;

  if (genreId) url += `&genres=${genreId}`;
  if (type !== "all") url += `&type=${type}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("API Error");

  return await res.json();
};

export default GetGenreAnime;
