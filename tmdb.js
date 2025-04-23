// TMDB API Integration

// Your API key - you'll need to get this from TMDB
// Visit https://www.themoviedb.org/signup to create an account
// Then go to https://www.themoviedb.org/settings/api to get your API key
const API_KEY = '0f49131a500259b84c7cbb8e4590f60f';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

// Image sizes from TMDB
const BACKDROP_SIZE = 'original';
const POSTER_SIZE = 'w500';
const PROFILE_SIZE = 'w185';

// API Endpoints
const API_ENDPOINTS = {
    trending: `${BASE_URL}/trending/all/day`,
    nowPlaying: `${BASE_URL}/movie/now_playing`,
    popular: `${BASE_URL}/movie/popular`,
    topRated: `${BASE_URL}/movie/top_rated`,
    upcoming: `${BASE_URL}/movie/upcoming`,
    movieDetails: (id) => `${BASE_URL}/movie/${id}`,
    movieCredits: (id) => `${BASE_URL}/movie/${id}/credits`,
    search: `${BASE_URL}/search/multi`
};

// Fetch data from TMDB API
async function fetchFromTMDB(url) {
    try {
        console.log('Fetching from TMDB:', url);
        const response = await fetch(`${url}?api_key=${API_KEY}&language=en-US`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('TMDB Response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
        return null;
    }
}

// Get trending movies/shows
async function getTrending() {
    const data = await fetchFromTMDB(API_ENDPOINTS.trending);
    return data?.results || [];
}

// Get now playing movies
async function getNowPlaying() {
    const data = await fetchFromTMDB(API_ENDPOINTS.nowPlaying);
    return data?.results || [];
}

// Get popular movies
async function getPopular() {
    const data = await fetchFromTMDB(API_ENDPOINTS.popular);
    return data?.results || [];
}

// Get top rated movies
async function getTopRated() {
    const data = await fetchFromTMDB(API_ENDPOINTS.topRated);
    return data?.results || [];
}

// Get upcoming movies
async function getUpcoming() {
    const data = await fetchFromTMDB(API_ENDPOINTS.upcoming);
    return data?.results || [];
}

// Get details for a specific movie
async function getMovieDetails(movieId) {
    return await fetchFromTMDB(API_ENDPOINTS.movieDetails(movieId));
}

// Get credits (cast & crew) for a specific movie
async function getMovieCredits(movieId) {
    return await fetchFromTMDB(API_ENDPOINTS.movieCredits(movieId));
}

// Search for movies, TV shows, or people
async function searchTMDB(query) {
    try {
        const response = await fetch(
            `${API_ENDPOINTS.search}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching TMDB:', error);
        return null;
    }
}

// Create HTML for a movie card
function createMovieCard(movie) {
    const backdropPath = movie.backdrop_path || movie.poster_path;
    if (!backdropPath) return '';
    
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.style.backgroundImage = `url('${IMAGE_BASE_URL}${POSTER_SIZE}${backdropPath}')`;
    movieCard.dataset.id = movie.id;
    movieCard.dataset.type = movie.media_type || 'movie';
    
    // Add event listener to show movie details
    movieCard.addEventListener('click', async () => {
        await showMovieDetails(movie.id);
    });
    
    return movieCard;
}

// Populate a row with movie cards
function populateMovieRow(rowId, movies) {
    const row = document.getElementById(rowId);
    if (!row) return;
    
    // Clear any existing content
    row.innerHTML = '';
    
    // Add movie cards to the row
    movies.forEach(movie => {
        const card = createMovieCard(movie);
        if (card) {
            row.appendChild(card);
        }
    });
}

// Show details for a specific movie
async function showMovieDetails(movieId) {
    const movieDetail = document.getElementById('movie-detail');
    if (!movieDetail) return;
    
    // Show loading state
    movieDetail.style.display = 'block';
    movieDetail.innerHTML = '<div style="text-align: center; padding: 50px;">Loading...</div>';
    
    // Fetch movie details and credits
    const [details, credits] = await Promise.all([
        getMovieDetails(movieId),
        getMovieCredits(movieId)
    ]);
    
    if (!details) {
        movieDetail.innerHTML = '<div style="text-align: center; padding: 50px;">Error loading movie details</div>';
        return;
    }
    
    // Format release date
    const releaseDate = details.release_date ? new Date(details.release_date).getFullYear() : '';
    
    // Format runtime
    const hours = Math.floor(details.runtime / 60);
    const minutes = details.runtime % 60;
    const runtime = details.runtime ? `${hours}h ${minutes}m` : '';
    
    // Format genres
    const genres = details.genres ? details.genres.map(genre => genre.name).join(', ') : '';
    
    // Create HTML for movie details
    const detailHTML = `
        <div class="movie-info">
            <div class="movie-poster" style="background-image: url('${IMAGE_BASE_URL}${POSTER_SIZE}${details.poster_path}')"></div>
            <div class="movie-text">
                <h2 class="movie-title">${details.title || details.name}</h2>
                <div class="movie-meta">
                    <span>${releaseDate}</span>
                    <span>${details.vote_average ? `⭐ ${details.vote_average.toFixed(1)}` : ''}</span>
                    <span>${runtime}</span>
                    <span>${genres}</span>
                </div>
                <p class="movie-description">${details.overview || 'No description available.'}</p>
                <div class="movie-cast">
                    <h3 class="cast-title">Cast</h3>
                    <div class="cast-list">
                        ${credits?.cast?.slice(0, 10).map(actor => `
                            <div class="cast-item">
                                <div class="cast-image" style="background-image: url('${actor.profile_path ? IMAGE_BASE_URL + PROFILE_SIZE + actor.profile_path : 'placeholder.jpg'}')"></div>
                                <div class="cast-name">${actor.name}</div>
                            </div>
                        `).join('') || 'No cast information available.'}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Update the details section
    movieDetail.innerHTML = detailHTML;
    
    // Scroll to the detail section
    movieDetail.scrollIntoView({ behavior: 'smooth' });
}

// Initialize the page
async function initializePage() {
    try {
        console.log('Initializing page...');
        // Fetch data for different sections
        const [trending, nowPlaying, popular] = await Promise.all([
            getTrending(),
            getNowPlaying(),
            getPopular()
        ]);
        
        console.log('Trending movies:', trending);
        console.log('Now playing:', nowPlaying);
        console.log('Popular movies:', popular);
        
        // Populate movie rows
        populateMovieRow('trending-row', trending.slice(0, 10));
        populateMovieRow('new-releases-row', nowPlaying.slice(0, 10));
        populateMovieRow('blockbuster-row', popular.slice(0, 10));
        
        // If there's a featured movie (first trending), update the hero section
        if (trending.length > 0) {
            const heroMovie = trending[0];
            console.log('Setting hero movie:', heroMovie);
            updateHeroSection(heroMovie);
        }
    } catch (error) {
        console.error('Error initializing page:', error);
    }
}

// Update the hero section with a movie
function updateHeroSection(movie) {
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-title');
    
    if (hero && heroTitle && movie.backdrop_path) {
        hero.style.backgroundImage = `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')`;
        heroTitle.textContent = movie.title || movie.name;
        
        // Add event listener to the "More Info" button
        const infoButton = document.querySelector('.info-btn');
        if (infoButton) {
            infoButton.addEventListener('click', async () => {
                await showMovieDetails(movie.id);
            });
        }
    }
}

// Search functionality
function setupSearch() {
    const searchIcon = document.querySelector('.search-icon');
    if (!searchIcon) return;
    
    // Create search modal
    const searchModal = document.createElement('div');
    searchModal.className = 'search-modal';
    searchModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 100;
        display: none;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 20px;
    `;
    
    searchModal.innerHTML = `
        <div style="width: 100%; max-width: 600px;">
            <input type="text" id="search-input" placeholder="Search for movies, TV shows, and people..." style="
                width: 100%;
                padding: 15px;
                background-color: #333;
                border: none;
                border-radius: 4px;
                color: #fff;
                font-size: 16px;
                margin-bottom: 20px;
            ">
            <div id="search-results" style="
                width: 100%;
                max-height: 70vh;
                overflow-y: auto;
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
            "></div>
            <button id="close-search" style="
                background-color: #e50914;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 20px;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(searchModal);
    
    // Toggle search modal
    searchIcon.addEventListener('click', () => {
        searchModal.style.display = 'flex';
        document.getElementById('search-input').focus();
    });
    
    // Close search modal
    document.getElementById('close-search').addEventListener('click', () => {
        searchModal.style.display = 'none';
    });
    
    // Search input event listener
    let searchTimeout;
    document.getElementById('search-input').addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        const query = e.target.value.trim();
        if (query.length < 3) {
            document.getElementById('search-results').innerHTML = '';
            return;
        }
        
        // Debounce search to avoid too many requests
        searchTimeout = setTimeout(async () => {
            const results = await searchTMDB(query);
            displaySearchResults(results?.results || []);
        }, 500);
    });
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    // Clear previous results
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p style="color: #fff;">No results found.</p>';
        return;
    }
    
    // Display results
    results.forEach(result => {
        if (result.media_type === 'movie' || result.media_type === 'tv') {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.style.cssText = `
                width: 150px;
                margin-bottom: 20px;
                cursor: pointer;
            `;
            
            const imagePath = result.poster_path || result.backdrop_path;
            resultItem.innerHTML = `
                <div style="
                    width: 150px;
                    height: 225px;
                    background-image: url('${imagePath ? IMAGE_BASE_URL + POSTER_SIZE + imagePath : 'placeholder.jpg'}');
                    background-size: cover;
                    background-position: center;
                    border-radius: 4px;
                    margin-bottom: 10px;
                "></div>
                <h3 style="color: #fff; font-size: 14px; text-align: center;">${result.title || result.name}</h3>
            `;
            
            resultItem.addEventListener('click', async () => {
                // Close search modal
                document.querySelector('.search-modal').style.display = 'none';
                
                // Show movie/show details
                await showMovieDetails(result.id);
            });
            
            searchResults.appendChild(resultItem);
        }
    });
}

// When the document is ready, initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    setupSearch();
}); 