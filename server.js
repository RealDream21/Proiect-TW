const express = require('express');
const app = express();
const path = require('path');
const formidableMiddleware = require('./middlewares/formidableMiddleware');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

const uploadedPictures = [];

app.get('/poze', (req, res) => {
  const pictureElement = uploadedPictures.map(filename => ({ path: `/uploads/${filename}`}));
  res.render('poze', { pictureElement });
});


app.get('/', (req, res) => {
  res.sendFile('/public/index.html', { root: __dirname });
});

app.post('/poze', formidableMiddleware({
  filter: ({ mimetype }) => mimetype && mimetype.includes("image")
}), (req, res) => {

  const picture = req.files.picture.newFilename;
  console.log(req.files.picture);
  console.log(picture);
  if (!picture) {
    res.send('Poza nu a fost trimisă.');
    return;
  }
  uploadedPictures.push(picture);
  console.log(uploadedPictures);

  res.send(`Salut, ${req.body.author}! Poza ta are ${picture.size} bytes.`);
});


app.listen(3000);
