const API_KEY = '94fe3d343b5b95aebe1bb2af7aae2984'; // TMDB APIキー
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // 画像ベースURL

// 全ての映画アイテムを取得
const movieItems = document.querySelectorAll('.movie-item');

movieItems.forEach(async (item) => {
    const movieId = item.dataset.id;
    try {
        const response = await fetch(`${BASE_URL}${movieId}?api_key=${API_KEY}`);
        const data = await response.json();

        // ポスター画像とタイトルを更新
        const poster = item.querySelector('.movie-poster');
        const title = item.querySelector('.movie-title');

        poster.src = IMAGE_BASE_URL + data.poster_path;
        poster.alt = data.title;
        title.textContent = `${data.title} (Movie ID: ${movieId})`;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
});