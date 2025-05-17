export interface Sticker {
  id: string;
  name: string;
  category: 'weather' | 'place' | 'activity';
  image: string;
}

export const stickers: Sticker[] = [
  // Weather stickers
  {
    id: 'weather-sunny',
    name: 'Sunny',
    category: 'weather',
    image: 'https://img.icons8.com/3d-fluency/94/sun.png'
  },
  {
    id: 'weather-cloudy',
    name: 'Cloudy',
    category: 'weather',
    image: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/2601.png'
  },
  {
    id: 'weather-rainy',
    name: 'Rainy',
    category: 'weather',
    image: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f327.png'
  },
  {
    id: 'weather-snowy',
    name: 'Snowy',
    category: 'weather',
    image: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f328.png'
  },

  // Place stickers
  {
    id: 'place-beach',
    name: 'Beach',
    category: 'place',
    image: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f3d6.png'
  },
  {
    id: 'place-mountain',
    name: 'Mountain',
    category: 'place',
    image: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/26f0.png'
  },
  {
    id: 'place-city',
    name: 'City',
    category: 'place',
    image: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f3d9.png'
  },
  {
    id: 'place-forest',
    name: 'Forest',
    category: 'place',
    image: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f333.png'
  },

  // Activity stickers
  {
    id: 'activity-hiking',
    name: 'Hiking',
    category: 'activity',
    image: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f6b6.png'
  },
  {
    id: 'activity-swimming',
    name: 'Swimming',
    category: 'activity',
    image: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f3ca.png'
  },
  {
    id: 'activity-shopping',
    name: 'Shopping',
    category: 'activity',
    image: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f6cd.png'
  },
  {
    id: 'activity-dining',
    name: 'Dining',
    category: 'activity',
    image: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f37d.png'
  }
];

export const categories = [
  { id: 'weather', name: 'Weather', icon: '⛅', color: '#607D8B' },
  { id: 'place', name: 'Places', icon: '🏞️', color: '#4CAF50' },
  { id: 'activity', name: 'Activities', icon: '🎯', color: '#FF9800' }
]; 