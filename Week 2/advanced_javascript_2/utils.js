export const fetchData = async (url) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!data) {
      throw new Error("No data received from server");
    }

    return data;
  } catch (error) {
    const errorMsg = error instanceof Error 
      ? error.message 
      : "An unknown error occurred while loading data";
    
    console.error("Fetch error:", errorMsg);
    throw new Error(errorMsg);
  };
};
