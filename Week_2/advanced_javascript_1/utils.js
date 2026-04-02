export const fetchData = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Error: " + res.status);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    alert("Failed to load data");
    return null;
  }
};
