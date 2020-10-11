const { saveVideo } = require('./schema');

const seeds = [
  {
    title: 'Coca Cola',
    summary: 'A Truck of Coca-Cola Bottles in Cases',
    thumbnail: 'a-truck-of-coca-cola-bottles-in-cases.jpg',
    fileName: 'a-truck-of-coca-cola-bottles-in-cases.mp4',
  },
  {
    title: 'Baby Tomatoes',
    summary: 'Close Up Footage Of Small Tomatoes',
    thumbnail: 'close-up-footage-of-a-small-tomato.jpg',
    fileName: 'close-up-footage-of-a-small-tomato.mp4',
  },
  {
    title: 'Wind Turbines',
    summary: 'A Beautifule View of Wind Turbines',
    thumbnail: 'a-beautiful-view-of-wind-turbines.jpg',
    fileName: 'a-beautiful-view-of-wind-turbines.mp4',
  },
];

seeds.forEach((column) => (saveVideo(column)));
