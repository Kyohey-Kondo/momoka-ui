const fetchNews = async () => {
  const headers = {
    "X-MICROCMS-API-KEY": "xT2mWfudutj5HeTb5RETSoZNDLJg6nh7qwME",
  }
  const option = {
    headers: headers,
  }
  const res = await fetch("https://momoka.microcms.io/api/v1/news", option);
  const data = await res.json();
  return data.contents
}

const render = async () => {
  const news = await fetchNews();
  const enabledNews = news.filter(newsItem => newsItem.enabled);
  console.log(enabledNews);

  // sort by date
  enabledNews.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  const newsContainer = document.getElementById("news");
  enabledNews.forEach(newsItem => {
    const formattedDate = extractDate(newsItem.date);

    const div = document.createElement("div");
    div.innerHTML = `
      <div class="news__item">
        <h3>${formattedDate} ${newsItem.title}</h3>
        <div>${newsItem.description || ""}</div>
      </div>
    `;
    newsContainer.appendChild(div);
  });
}

const extractDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため +1
  const day = String(date.getDate()).padStart(2, '0');

  // フォーマットを適用して出力
  return `${year}.${month}.${day}`;
}

render();
