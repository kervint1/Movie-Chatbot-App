const API_KEY = '94fe3d343b5b95aebe1bb2af7aae2984';
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

let movies = [];
let currentIndex = 0;

const leftPanel = document.getElementById('left-panel');
const mainPanel = document.getElementById('main-panel');
const rightPanel = document.getElementById('right-panel');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const genreSelect = document.getElementById('genre-select');

// 指定ジャンルの映画を取得
async function fetchMoviesByGenre(genreId) {
    try {
        const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&with_genres=${genreId}`);
        const data = await response.json();
        movies = data.results;
        currentIndex = 0;
        updatePanels(); // パネルを更新
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function addMainPanelClickEvent() {
    mainPanel.addEventListener('click', () => {
        if (!movies || movies.length === 0) return;
        const mainMovie = movies[currentIndex];
        if (mainMovie && mainMovie.id) {
            window.location.href = `/movie/${mainMovie.id}/`;
        }
    });
}

function updatePanels() {
    if (movies.length === 0) {
        leftPanel.innerHTML = mainPanel.innerHTML = rightPanel.innerHTML = '<p>No movies found for this genre.</p>';
        return;
    }

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

    // 動的に更新後にクリックイベントを再設定
    addMainPanelClickEvent();
}

leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + movies.length) % movies.length;
    updatePanels();
});

rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % movies.length;
    updatePanels();
});

// ジャンル変更時の処理
genreSelect.addEventListener('change', (event) => {
    const selectedGenre = event.target.value;
    fetchMoviesByGenre(selectedGenre);
});

// 初期ジャンルでロード
fetchMoviesByGenre(28); // デフォルトでアクションジャンルをロード