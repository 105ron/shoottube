const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const URL = 'mongodb://127.0.0.1:27017/videos';

mongoose.connect(URL, { useNewUrlParser: true });

const VideoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    default: 'No title provided',
  },
  summary: {
    type: String,
    default: 'Summary not available',
  },
  fileName: {
    type: String,
    unique: true,
  },
  thumbnail: {
    type: String,
    default: '',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

VideoSchema.index({ fileName: 1 }, { unique: true });

VideoSchema.plugin(uniqueValidator);

const Video = mongoose.model('Video', VideoSchema);

function saveVideo({
  fileName, summary, thumbnail, title,
}) {
  const newVideo = new Video({
    _id: new mongoose.Types.ObjectId(),
    title,
    summary,
    thumbnail,
    fileName,
  });
  newVideo.save((err) => {
    if (err) throw err;
    console.log(`Video ${title} successfully saved.`);
  });
}

const seeds = [
  {
    title: 'Coca Cola',
    summary: 'A Truck of Coca-Cola Bottles in Cases',
    thumbnail: 'a-truck-of-coca-cola-bottles-in-cases.png',
    fileName: 'a-truck-of-coca-cola-bottles-in-cases.mp4',
  },
  {
    title: 'Baby Tomatoes',
    summary: 'Close Up Footage Of Small Tomatoes.mp4',
    thumbnail: 'close-up-footage-of-a-small-tomato.png',
    fileName: 'close-up-footage-of-a-small-tomato',
  },
  {
    title: 'Wind Turbines',
    summary: 'A Beautifule View of Wind Turbines',
    thumbnail: 'a-beautiful-view-of-wind-turbines.png',
    fileName: 'a-beautiful-view-of-wind-turbines.mp4',
  },
];

seeds.forEach((column) => (saveVideo(column)));

module.exports = saveVideo;
