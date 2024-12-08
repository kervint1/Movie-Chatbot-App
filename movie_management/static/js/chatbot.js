const API_KEY = '94fe3d343b5b95aebe1bb2af7aae2984';
const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const GENRE_MAPPING = {
    "アクション": 28,
    "コメディ": 35,
    "ドラマ": 18,
    "ホラー": 27,
    "SF": 878
};

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

function appendMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}-message`;
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchMoviesByGenre(genre) {
    const genreId = GENRE_MAPPING[genre];
    if (!genreId) {
        return "指定されたジャンルの映画が見つかりませんでした。";
    }

    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&with_genres=${genreId}`);
    if (response.ok) {
        const data = await response.json();
        if (data.results.length > 0) {
            return data.results.slice(0, 5).map(movie => `${movie.title} (${movie.release_date})`).join("\n");
        } else {
            return "そのジャンルの映画は見つかりませんでした。";
        }
    } else {
        return "映画を取得中にエラーが発生しました。もう一度お試しください。";
    }
}

sendButton.addEventListener("click", async () => {
    const userMessage = userInput.value.trim();
    if (userMessage === "") return;

    appendMessage(userMessage, "user");
    userInput.value = "";

    if (userMessage.includes("おすすめ")) {
        const genreMatch = userMessage.match(/アクション|コメディ|ドラマ|ホラー|SF/);
        if (genreMatch) {
            const genre = genreMatch[0];
            const recommendations = await fetchMoviesByGenre(genre);
            appendMessage(`こちらはおすすめの${genre}映画です:\n${recommendations}`, "bot");
        } else {
            appendMessage("ジャンルを指定してください（例: アクション、コメディ、ドラマ、ホラー、SF）。", "bot");
        }
    } else {
        appendMessage("映画をおすすめします。例:『アクション映画をおすすめして』と入力してください。", "bot");
    }
});
