const express = require('express');
const Url = require('./models/Url');
const URL = require('url').URL;
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.post('/add', async (req, res) => {
  try {
    const { fullURL } = req.body;
    const url = new URL(fullURL);
    const result = await Url.create({ fullURL: url.href });
    res.end(result.id);
  } catch (error) {
    console.error(error);
    res.status(503).end('Error occurred');
  }
});

app.get('/:shortURL', async (req, res) => {
  try {
    const { shortURL } = req.params;
    const { fullURL } = await Url.findById(shortURL);
    url = new URL(fullURL);
    res.status(301).redirect(url.href);
  } catch (error) {
    console.error(error);
    res.status(503).end('Error occurred');
  }
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready On Server http://localhost:${port}`);
});
