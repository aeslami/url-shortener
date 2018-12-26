const express = require('express');
const Url = require('./models/Url');
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.post('/add', async (req, res) => {
  const { fullURL } = req.body;
  const result = await Url.create({ fullURL });
  res.end(result.id);
});

app.get('/:shortURL', async (req, res) => {
  const { shortURL } = req.params;
  const { fullURL } = await Url.findById(shortURL);
  res.status(301).redirect(fullURL);
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready On Server http://localhost:${port}`);
});
