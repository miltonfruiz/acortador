const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/acortadorurls', { useNewUrlParser: true, useUnifiedTopology: true });

const Url = mongoose.model('Url', {
  originalUrl: String,
  shortUrl: String
});

const User = mongoose.model('User', {
  username: String,
  password: String
});

const secretKey = 'mi-llave-secreta';

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  res.json({ token });
});

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No autorizado' });
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });
    req.userId = decoded.userId;
    next();
  });
};

app.post('/acortar', authenticate, async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = Math.random().toString(36).substr(2, 6);
  const url = new Url({ originalUrl, shortUrl });
  await url.save();
  res.json({ shortUrl });
});

app.get('/redirigir/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const url = await Url.findOne({ shortUrl });
  if (!url) return res.status(404).json({ message: 'URL no encontrada' });
  res.redirect(url.originalUrl);
});

app.get('/misurls', authenticate, async (req, res) => {
  const userId = req.userId;
  const urls = await Url.find({ userId });
  res.json(urls);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});