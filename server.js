const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    return res.status(400).send('Invalid request');
  }

  const filePath = path.join(__dirname, 'uploads', req.headers['x-filename']);

  const writeStream = fs.createWriteStream(filePath);

  req.on('data', (data) => {
    writeStream.write(data);
  });

  req.on('end', () => {
    writeStream.end();
    res.send('File uploaded!');
  });

  req.on('error', (error) => {
    console.error(error);
    res.status(500).send('Eroare la trimiterea fisierului');
  });
});

app.listen(port, () => {
  console.log(`Serverul este pornit`);
});
