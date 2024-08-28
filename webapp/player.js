let API_BASE_URL = removeTrailingSlash(localStorage.getItem('apiDomain')) || 'https://yts.mx';
const player = document.getElementById('player');
const movieInfo = document.getElementById('movieInfo');

function removeTrailingSlash(url) {
    return url.replace(/\/$/, '');
}

function getMovieIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function fetchMovieDetails(movieId) {
    const url = `${API_BASE_URL}/api/v2/movie_details.json?movie_id=${movieId}&with_images=true&with_cast=true`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.data.movie) {
                const movie = data.data.movie;
                displayMovieInfo(movie);
                setupPlayer(movie);
            } else {
                throw new Error('Movie not found');
            }
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
            movieInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

function displayMovieInfo(movie) {
    let castHTML = '';
    if (movie.cast && Array.isArray(movie.cast)) {
        castHTML = `
            <h3>Cast:</h3>
            <ul>
                ${movie.cast.map(actor => `<li>${actor.name}${actor.character_name ? ` as ${actor.character_name}` : ''}</li>`).join('')}
            </ul>
        `;
    }

    movieInfo.innerHTML = `
        <h2>${movie.title}</h2>
        <p>Year: ${movie.year}</p>
        <p>Rating: ${movie.rating}</p>
        <p>Genre: ${movie.genres ? movie.genres.join(', ') : 'N/A'}</p>
        <p>Synopsis: ${movie.synopsis || 'No synopsis available'}</p>
        ${castHTML}
    `;
}

function setupPlayer(movie) {
    if (movie.torrents && movie.torrents.length > 0) {
        fetchTrackers()
            .then(trackers => {
                if (trackers.length > 0) {
                    const trackersString = trackers.map(tracker => `&tr=${encodeURIComponent(tracker)}`).join('');
                    const magnetUrl = `magnet:?xt=urn:btih:${movie.torrents[0].hash}&dn=${encodeURIComponent(movie.title)}${trackersString}`;

                    window.webtor = window.webtor || [];
                    window.webtor.push({
                        id: 'player',
                        magnet: magnetUrl,
                        on: function(e) {
                            if (e.name === 'ready') {
                                console.log('Player is ready');
                            }
                        },
                        width: '100%',
                    });
                } else {
                    console.error('No trackers fetched');
                    player.innerHTML = '<p>Error: No trackers available.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching trackers:', error);
                player.innerHTML = `<p>Error: Failed to fetch trackers. Please try again later.</p>`;
            });
    } else {
        console.error('No torrent information available for this movie');
        player.innerHTML = '<p>Error: No playable content available for this movie.</p>';
    }
}

async function fetchTrackers() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_best.txt');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const lines = text.split('\n');
        const udpTrackers = lines.filter(line => {
            const trimmedLine = line.trim();
            return trimmedLine.startsWith('udp://');
        });

        const validTrackers = udpTrackers.map(tracker => {
            const parsedTracker = new URL(tracker);
            return parsedTracker.protocol === 'udp:' ? tracker : null;
        }).filter(Boolean);

        return validTrackers;
    } catch (error) {
        console.error('Error fetching trackers:', error);
        return [];
    }
}

const movieId = getMovieIdFromUrl();
if (movieId) {
    fetchMovieDetails(movieId);
} else {
    console.error('No movie ID provided');
    movieInfo.innerHTML = '<p>Error: No movie ID provided</p>';
}