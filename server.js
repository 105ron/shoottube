const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const fs = require('fs');

const cors = require('cors');

const mongoose = require('mongoose');

const multer = require('multer');

const { saveVideo, Video } = require('./schema');

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

app.get('/videos', (req, res) => {
  Video.find({}, (err, videos) => {
    res.send(videos);
  });
});

app.get('/play/:slug', (req, res) => {
  Video.find({ _id: req.params.slug }, (err, video) => {
    res.send(video);
  });
});

app.get('/stream/:slug', (req, res) => {
  const { slug } = req.params;
  const path = `./public/videos/${slug}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const { range } = req.headers;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

app.listen(8000, () => {
  console.log('Server started, now listening on port 8000');
});
