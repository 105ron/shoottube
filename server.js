const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');

const multer = require('multer');

const saveVideo = require('./seeds');

app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb://127.0.0.1:27017/videos';

mongoose.connect(url, { useNewUrlParser: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/videos');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single('file');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    }
    saveVideo({
      fileName: req.file.originalname,
      summary: req.body.description,
      thumbnail: '',
      title: req.body.title,
    });
    return res.status(200).send(req.file);
  });
});

app.listen(8000, () => {
  console.log('Server started, now listening on port 8000');
});
