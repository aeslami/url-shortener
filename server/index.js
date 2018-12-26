const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app.get('/:shortUrl', (req, res) => {
  res.end(`Requested URL: ${req.params.shortUrl}`);
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready On Server http://localhost:${port}`);
});
