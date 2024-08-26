const express = require("express")
const cors = require("cors")
const app = express();

app.use(cors())

app.get("/api/v2/list_movies.json", (req, res) => {
  fetch(`https://yts.mx/api/v2/list_movies.json?limit=${req.query.limit}&page=${req.query.page}&query_term=${req.query.query_term}&genre=${req.query.genre}`)
  .then(data => data.json())
  .then(list => {
    res.json(list)
  })
  .catch(err => {
    res.send(err)
  })
});

app.get("/api/v2/movie_details.json", (req, res) => {
  fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${req.query.movie_id}&with_images=${req.query.with_images}&with_cast=${req.query.with_cast}`)
  .then(data => data.json())
  .then(list => {
    res.json(list)
  })
  .catch(err => {
    res.send(err)
  })
});

app.listen(3000, () => {
  console.log("Project is ready!")
})