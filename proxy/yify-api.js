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

app.get('/assets/images/movies/*', async (req, res) => {
  const imagePath = req.params[0];
  const imageUrl = `https://yts.mx/assets/images/movies/${imagePath}`;

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const contentType = response.headers.get("content-type");
    res.setHeader("Content-Type", contentType);
    let chunks = [];
    for await (const chunk of response.body) {
        chunks.push(chunk);
    }
    const body = Buffer.concat(chunks);
    res.write(body);
    res.end();
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
}
});



const PORT = process.env.PORT || 25541;
app.listen(PORT, () => {
  console.log(`yts ready`);
});