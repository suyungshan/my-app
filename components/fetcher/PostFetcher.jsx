const PostFetcher = async (postApiUrls, postData) => {
  const promises = postApiUrls.map(async (url) => {
    console.log(postData);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 如果有其他標頭，請在這裡添加
      },
      body: JSON.stringify(postData),
      // 如果需要使用其他請求體格式，請相應地更改這裡
    });

    const result = await response.json();
    console.log(result);
    return result;
  });

  const results = await Promise.all(promises);
  return results;
};

export default PostFetcher;
