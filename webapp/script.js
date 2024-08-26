// script.js
let API_BASE_URL = localStorage.getItem('apiDomain') || 'https://yts.mx/api/v2/';
let currentPage = 1;
let currentGenre = '';
const movieList = document.getElementById('movieList');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const currentPageSpan = document.getElementById('currentPage');
const genreFilter = document.getElementById('genreFilter');

searchButton.addEventListener('click', () => {
    currentPage = 1;
    fetchMovies();
});

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchMovies();
    }
});

nextPageButton.addEventListener('click', () => {
    currentPage++;
    fetchMovies();
});

function fetchMovies() {
    const searchTerm = searchInput.value;
    const url = `${API_BASE_URL}list_movies.json?limit=20&page=${currentPage}&query_term=${searchTerm}&genre=${currentGenre}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.data.movies);
            updatePagination(data.data.movie_count);
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const mpaRating = movie.mpa_rating ? movie.mpa_rating : 'NR (not rated)';
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="${movie.medium_cover_image}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>Year: ${movie.year}</p>
                <p>Rating: ${movie.rating}</p>
                <p>MPA: ${mpaRating}</p>
            </div>
            <a href="player.html?id=${movie.id}" class="play-btn">
                <i class="fas fa-play"></i> Play
            </a>
        `;
        movieList.appendChild(movieCard);
    });
}

function updatePagination(totalMovies) {
    const totalPages = Math.ceil(totalMovies / 20);
    currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;
}

function setupGenreFilter() {
    const genres = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'];
    genres.forEach(genre => {
        const button = document.createElement('button');
        button.className = 'genre-btn';
        button.textContent = genre;
        button.addEventListener('click', () => {
            currentGenre = genre;
            currentPage = 1;
            fetchMovies();
            document.querySelectorAll('.genre-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
        genreFilter.appendChild(button);
    });
}

const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');
const saveSettings = document.getElementById('saveSettings');
const apiDomainInput = document.getElementById('apiDomain');

settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'block';
    apiDomainInput.value = API_BASE_URL;
});

closeSettings.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

saveSettings.addEventListener('click', () => {
    const newDomain = apiDomainInput.value.trim();
    if (newDomain) {
        API_BASE_URL = newDomain;
        localStorage.setItem('apiDomain', newDomain);
        settingsModal.style.display = 'none';
        fetchMovies(); // Refresh the movie list with the new API domain
    }
});

window.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
});

setupGenreFilter();
fetchMovies();