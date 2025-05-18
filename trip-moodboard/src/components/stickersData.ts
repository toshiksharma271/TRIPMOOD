// stickersData.ts

export interface Sticker {
  id: string;
  name: string;
  category: 'weather' | 'place' | 'activity';
  image: string;
  lottie?: string;
}

export const stickers: Sticker[] = [
  // Weather stickers
  {
    id: 'weather-sunny',
    name: 'Sunny',
    category: 'weather',
    image: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
  },
  {
    id: 'weather-cloudy',
    name: 'Cloudy',
    category: 'weather',
    image: 'https://cdn-icons-png.flaticon.com/512/414/414825.png',
  },
  {
    id: 'weather-rainy',
    name: 'Rainy',
    category: 'weather',
    image: 'https://cdn-icons-png.flaticon.com/512/414/414974.png',
  },
  {
    id: 'weather-snowy',
    name: 'Snowy',
    category: 'weather',
    image: 'https://cdn-icons-png.flaticon.com/512/642/642102.png',
  },
  {
    id: 'weather-thunderstorm',
    name: 'Thunderstorm',
    category: 'weather',
    image: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
  },
  {
    id: 'weather-windy',
    name: 'Windy',
    category: 'weather',
    image: 'https://cdn-icons-png.flaticon.com/512/414/414927.png',
  },

  // Place stickers
  {
    id: 'place-beach',
    name: 'Beach',
    category: 'place',
    image: '/images/destination.png',
  },
  {
    id: 'place-mountain', 
    name: 'Mountain',
    category: 'place',
    image: 'images/mountain.png',
  },
  {
    id: 'place-city',
    name: 'City',
    category: 'place',
    image: 'images/new-york.png',
  },
  {
    id: 'place-forest',
    name: 'Forest',
    category: 'place',
    image: 'images/tree.png',
  },
  {
    id: 'place-desert',
    name: 'Desert',
    category: 'place',
    image: 'images/desert.png',
  },
  {
    id: 'place-castle',
    name: 'Castle',
    category: 'place',
    image: 'images/ghost-castle.png',
  },

  // Activity stickers
  {
    id: 'activity-hiking',
    name: 'Hiking',
    category: 'activity',
    image: '/images/boy.png',
  },
  {
    id: 'activity-cycling',
    name: 'Cycling',
    category: 'activity',
    image: '/images/cycling.png',
  },
  {
    id: 'activity-swimming',
    name: 'Swimming',
    category: 'activity',
    image: '/images/swimming.png',
  },
  {
    id: 'activity-running',
    name: 'Running',
    category: 'activity',
    image: '/images/hobby.png',
  },
  {
    id: 'activity-cricket',
    name: 'cricket',
    category: 'activity',
    image: '/images/cricket.png',
  },
  {
    id: 'activity-football',
    name: '',
    category: 'activity',
    image: '/images/football.png',
  },
];

export const categories = [
  { id: 'weather', name: 'Weather', icon: '⛅', color: '#607D8B' },
  { id: 'place', name: 'Places', icon: '🏞️', color: '#4CAF50' },
  { id: 'activity', name: 'Activities', icon: '🎯', color: '#FF9800' },
];
