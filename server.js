const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Movie Search API
app.get("/api/movie/:title", async (req, res) => {
    try {
        const title = req.params.title;

        const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${encodeURIComponent(title)}`;

        const response = await fetch(url);
        const data = await response.json();

        res.json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

// Popular movies
app.get("/api/popular", async (req, res) => {

    try {

        const movies = [
            "Inception",
            "Interstellar",
            "Avengers",
            "The Dark Knight",
            "Titanic"
        ];

        const results = [];

        for (const movie of movies) {

            const url =
                `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${encodeURIComponent(movie)}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === "True") {
                results.push(data);
            }
        }

        res.json(results);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Unable to load popular movies"
        });
    }
});



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});