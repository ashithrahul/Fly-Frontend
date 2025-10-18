export const fetchListAPI = async ({ url }) => {

  const response = await fetch(url);
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data;
};