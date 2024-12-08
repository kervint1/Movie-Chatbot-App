const API_KEY = '94fe3d343b5b95aebe1bb2af7aae2984'; // TMDBのAPIキーを設定してください
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // 幅500pxの画像を取得

let movies = []; // 映画情報を格納
let currentIndex = 0; // 現在のインデックス



// パネル要素を取得
const leftPanel = document.getElementById('left-panel');
const mainPanel = document.getElementById('main-panel');
const rightPanel = document.getElementById('right-panel');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

// APIからデータを取得
// APIからデータを取得
async function fetchMovies() {
    try {
        const response = await fetch(`${BASE_URL}?api_key=${API_KEY}`);
        const data = await response.json();
        movies = data.results; // 映画情報を格納
        updatePanels();

        // メインパネルのクリックイベントを追加
        addMainPanelClickEvent();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// メインパネルクリックイベントを追加
function addMainPanelClickEvent() {
    mainPanel.addEventListener('click', () => {
        const mainMovie = movies[currentIndex];
        // 映画の詳細ページにリダイレクト
        window.location.href = `/movie/${mainMovie.id}/`;
    });
}


// パネルの内容を更新
function updatePanels() {
    const leftMovie = movies[(currentIndex - 1 + movies.length) % movies.length];
    const mainMovie = movies[currentIndex];
    const rightMovie = movies[(currentIndex + 1) % movies.length];

    leftPanel.innerHTML = `
        <h3>${leftMovie.title}</h3>
        <img src="${IMAGE_BASE_URL + leftMovie.poster_path}" alt="${leftMovie.title}" />
    `;
    mainPanel.innerHTML = `
        <h2>${mainMovie.title}</h2>
        <img src="${IMAGE_BASE_URL + mainMovie.poster_path}" alt="${mainMovie.title}" />
    `;
    rightPanel.innerHTML = `
        <h3>${rightMovie.title}</h3>
        <img src="${IMAGE_BASE_URL + rightMovie.poster_path}" alt="${rightMovie.title}" />
    `;
}

// 左矢印クリックイベント
leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + movies.length) % movies.length;
    updatePanels();
});

// 右矢印クリックイベント
rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % movies.length;
    updatePanels();
});

// 初期化
fetchMovies();