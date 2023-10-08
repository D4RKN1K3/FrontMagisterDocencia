export const fetchHelpers = async (url, config) => {
    const response = await fetch(url, config);
    return response.json();
  };
  