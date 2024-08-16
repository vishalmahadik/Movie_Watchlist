// server.js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const dataPath = path.join(__dirname, "data.json");

// Helper function to read the JSON file
const readData = () => {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

// Helper function to write to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET all movies
app.get("/api/movies", (req, res) => {
  const data = readData();
  res.json(data.movies);
});

// GET a single movie
app.get("/api/movies/:id", (req, res) => {
  const data = readData();
  const movie = data.movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("Movie not found");
  res.json(movie);
});

// POST a new movie
app.post("/api/movies", (req, res) => {
  const data = readData();
  const newMovie = {
    id: Date.now(),
    ...req.body,
    watched: false,
    rating: 0,
    review: "",
  };
  data.movies.push(newMovie);
  writeData(data);
  res.status(201).json(newMovie);
});

// PUT (update) a movie
app.put("/api/movies/:id", (req, res) => {
  const data = readData();
  const index = data.movies.findIndex((m) => m.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Movie not found");
  data.movies[index] = { ...data.movies[index], ...req.body };
  writeData(data);
  res.json(data.movies[index]);
});

// DELETE a movie
app.delete("/api/movies/:id", (req, res) => {
  const data = readData();
  const index = data.movies.findIndex((m) => m.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Movie not found");
  data.movies.splice(index, 1);
  writeData(data);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
