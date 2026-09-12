async function searchMovie() {

    const movieInput = document.getElementById("movieInput");
    const result = document.getElementById("result");

    const movieName = movieInput.value.trim();

    if (movieName === "") {
        result.innerHTML = "<p>Please enter a movie name.</p>";
        return;
    }

    result.innerHTML = "<p>Searching...</p>";

    try {

        const response = await fetch(
            `/api/movie/${encodeURIComponent(movieName)}`
        );

        const movie = await response.json();

        if (movie.Response === "False") {
            result.innerHTML = `<p>Movie not found.</p>`;
            return;
        }

        result.innerHTML = `
            <div class="movie-card">

                <img src="${movie.Poster}" alt="${movie.Title}">

                <div class="movie-info">

                    <h2>${movie.Title}</h2>

                    <p><strong>Year:</strong> ${movie.Year}</p>

                    <p><strong>Genre:</strong> ${movie.Genre}</p>

                    <p><strong>IMDb Rating:</strong> ⭐ ${movie.imdbRating}</p>

                    <p><strong>Director:</strong> ${movie.Director}</p>

                    <p><strong>Actors:</strong> ${movie.Actors}</p>

                    <p><strong>Plot:</strong> ${movie.Plot}</p>

                </div>

            </div>
        `;

    } catch (error) {

        console.log(error);

        result.innerHTML =
            "<p>Something went wrong. Please try again.</p>";
    }
}

async function loadPopularMovies() {

    const popularMovies =
        document.getElementById("popularMovies");

    try {

        const response = await fetch("/api/popular");

        const movies = await response.json();

        popularMovies.innerHTML = "";

        movies.forEach(movie => {

            popularMovies.innerHTML += `
                <div class="popular-card">

                    <img src="${movie.Poster}"
                         alt="${movie.Title}">

                    <h3>${movie.Title}</h3>

                    <p>⭐ ${movie.imdbRating}</p>

                    <p>${movie.Year}</p>

                </div>
            `;
        });

    } catch (error) {

        console.log(error);

        popularMovies.innerHTML =
            "<p>Unable to load movies.</p>";
    }
}

loadPopularMovies();

document.getElementById("movieInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        searchMovie();
    }

});