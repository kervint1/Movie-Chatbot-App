const API_KEY = '94fe3d343b5b95aebe1bb2af7aae2984'; // TMDB��API�L�[��ݒ肵�Ă�������
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // ��500px�̉摜���擾

let movies = []; // �f������i�[
let currentIndex = 0; // ���݂̃C���f�b�N�X

// �p�l���v�f���擾
const leftPanel = document.getElementById('left-panel');
const mainPanel = document.getElementById('main-panel');
const rightPanel = document.getElementById('right-panel');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

// API����f�[�^���擾
async function fetchMovies() {
    try {
        const response = await fetch(`${BASE_URL}?api_key=${API_KEY}`);
        const data = await response.json();
        movies = data.results; // �f������i�[
        updatePanels();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// �p�l���̓��e���X�V
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

// �����N���b�N�C�x���g
leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + movies.length) % movies.length;
    updatePanels();
});

// �E���N���b�N�C�x���g
rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % movies.length;
    updatePanels();
});

// ������
fetchMovies();
