const GetFetcher = async (getApiUrls) => {
  const promises = getApiUrls.map(async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  });

  const results = await Promise.all(promises);
  return results;
};

export default GetFetcher;
