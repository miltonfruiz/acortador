const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String
});

const Url = mongoose.model('Url', urlSchema);

app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = Math.random().toString(36).slice(2);
  const url = new Url({ originalUrl, shortUrl });
  try {
    await url.save();
    res.json({ shortUrl });
  } catch (err) {
    console.log('Error saving URL:', err);
    res.status(500).json({ message: 'Error saving URL' });
  }
});

app.get('/api/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;
  try {
    const url = await Url.findOne({ shortUrl });
    if (!url) {
      res.status(404).json({ message: 'URL not found' });
    } else {
      res.redirect(url.originalUrl);
    }
  } catch (err) {
    console.log('Error finding URL:', err);
    res.status(500).json({ message: 'Error finding URL' });
  }
});