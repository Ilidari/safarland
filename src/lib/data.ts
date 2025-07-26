export const sampleHotels = [
  {
    id: 1,
    name: 'Grand Luxury Hotel',
    location: 'Tehran, Iran',
    rating: 4.8,
    reviews: 1250,
    price: 180,
    image: 'https://placehold.co/800x600.png',
    amenities: ['wifi', 'parking', 'restaurant', 'gym'],
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    description: "Experience unparalleled luxury at the Grand Luxury Hotel, located in the heart of Tehran. With world-class amenities and breathtaking city views, your stay will be nothing short of memorable."
  },
  {
    id: 2,
    name: 'Ocean View Resort',
    location: 'Kish, Iran',
    rating: 4.6,
    reviews: 890,
    price: 220,
    image: 'https://placehold.co/800x600.png',
    amenities: ['wifi', 'pool', 'restaurant', 'spa'],
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    description: "Escape to paradise at the Ocean View Resort on Kish Island. Enjoy stunning sea views, a magnificent pool, and a rejuvenating spa experience. Perfect for a romantic getaway or a family vacation."
  },
  {
    id: 3,
    name: 'Mountain Lodge',
    location: 'Shiraz, Iran',
    rating: 4.5,
    reviews: 650,
    price: 120,
    image: 'https://placehold.co/800x600.png',
    amenities: ['wifi', 'restaurant', 'parking'],
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    description: "Nestled in the serene mountains near Shiraz, the Mountain Lodge offers a tranquil retreat from the hustle and bustle of city life. Enjoy cozy rooms, delicious local cuisine, and easy access to hiking trails."
  },
  {
    id: 4,
    name: 'Isfahan Traditional Hotel',
    location: 'Isfahan, Iran',
    rating: 4.9,
    reviews: 2100,
    price: 150,
    image: 'https://placehold.co/800x600.png',
    amenities: ['wifi', 'restaurant', 'courtyard'],
    images: [
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
      'https://placehold.co/800x600.png',
    ],
    description: "Step back in time at the Isfahan Traditional Hotel. This beautifully restored historic house offers an authentic Persian experience with its stunning courtyard, intricate tilework, and traditional hospitality."
  }
];

export const popularDestinations = [
  { name: 'Tehran', image: 'https://placehold.co/800x400.png', hint: 'city skyline' },
  { name: 'Isfahan', image: 'https://placehold.co/800x400.png', hint: 'historic bridge' },
  { name: 'Shiraz', image: 'https://placehold.co/400x400.png', hint: 'ancient ruins' },
  { name: 'Kish', image: 'https://placehold.co/400x400.png', hint: 'beach resort' },
  { name: 'Yazd', image: 'https://placehold.co/800x400.png', hint: 'desert city' },
  { name: 'Tabriz', image: 'https://placehold.co/800x800.png', hint: 'bazaar architecture' }
];

export type Hotel = typeof sampleHotels[0];
