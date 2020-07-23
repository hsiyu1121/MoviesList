const express = require("express");
const app = express();

const exphbs = require("express-handlebars");
const movieList = require('./movies.json')
const port = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static('public'))

app.get("/", (req, res) => {
  res.render("index", {movie : movieList.results});
});

app.get('/search', (req, res)=>{
  console.log(req.query)
  const keyword = req.query.keyword
  const movie = movieList.results.filter(movie =>{
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index',{ movie:movie, keyword:keyword})
})

app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', {movie:movie})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
