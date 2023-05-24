const express = require('express');
const app = express();
const path = require('path');
const formidableMiddleware = require('./middlewares/formidableMiddleware');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

const uploadedPictures = [];

app.get('/poze', (req, res) => {
  const poze = uploadedPictures.map(filename => ({ path: `/uploads/${filename}`}));
  console.log(poze);
  res.render('poze', { poze });
});

app.get('/', (req, res) => {
  res.sendFile('/public/index.html', { root: __dirname });
});

app.post('/poze', formidableMiddleware({
  filter: ({ mimetype }) => mimetype && mimetype.includes("image")
}), (req, res) => {

  const poza = req.files.picture.newFilename;
  console.log(req.files.picture);
  if (!poza) {
    alert('Nu ai selectat nicio poza!');
    return;
  }
  uploadedPictures.push(poza);
  res.redirect('/poze');
  
});

app.use((req, res, next) => {
  res.status(404).sendFile('/public/404.html', { root: __dirname });
});


app.listen(3000);
