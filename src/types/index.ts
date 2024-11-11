export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  stock: number;
  tags: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  wishlist: string[];
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'rating';
  search?: string;
}</content></file>

<boltAction type="file" filePath="src/api/products.ts">
import { Product, ProductFilters } from '../types';

// Simulated product database
// const products: Product[] = [
//   {
//     id: '1',
//     name: 'Premium Wireless Headphones',
//     price: 299.99,
//     description: 'High-quality wireless headphones with noise cancellation.',
//     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
//     category: 'Electronics',
//     rating: 4.5,
//     stock: 50,
//     tags: ['wireless', 'audio', 'headphones'],
//   },
//   {
//     id: '2',
//     name: 'Leather Weekend Bag',
//     price: 199.99,
//     description: 'Handcrafted leather bag perfect for weekend getaways.',
//     image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
//     category: 'Accessories',
//     rating: 4.8,
//     stock: 30,
//     tags: ['leather', 'travel', 'bag'],
//   },
//   {
//     id: '3',
//     name: 'Smart Watch Series X',
//     price: 399.99,
//     description: 'Latest smartwatch with health tracking and notifications.',
//     image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
//     category: 'Electronics',
//     rating: 4.7,
//     stock: 25,
//     tags: ['smartwatch', 'fitness', 'tech'],
//   },
// ];
const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    description: 'High-quality wireless headphones with noise cancellation.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Electronics',
    rating: 4.5,
    stock: 50,
    tags: ['wireless', 'audio', 'headphones'],
  },
  {
    id: '2',
    name: 'Leather Weekend Bag',
    price: 199.99,
    description: 'Handcrafted leather bag perfect for weekend getaways.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    category: 'Accessories',
    rating: 4.8,
    stock: 30,
    tags: ['leather', 'travel', 'bag'],
  },
  {
    id: '3',
    name: 'Smart Watch Series X',
    price: 399.99,
    description: 'Latest smartwatch with health tracking and notifications.',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12',
    category: 'Electronics',
    rating: 4.7,
    stock: 25,
    tags: ['smartwatch', 'fitness', 'tech'],
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    price: 149.99,
    description: 'Adjustable office chair with lumbar support for comfort.',
    image: 'https://images.unsplash.com/photo-1562183240-2d99e45d3b24',
    category: 'Furniture',
    rating: 4.3,
    stock: 15,
    tags: ['furniture', 'office', 'ergonomic'],
  },
  {
    id: '5',
    name: 'Yoga Mat with Alignment Lines',
    price: 39.99,
    description: 'Non-slip yoga mat with alignment lines for perfect form.',
    image: 'https://images.unsplash.com/photo-1569937728384-921ef164d018',
    category: 'Fitness',
    rating: 4.6,
    stock: 60,
    tags: ['fitness', 'yoga', 'mat'],
  },
  {
    id: '6',
    name: 'Bluetooth Speaker Pro',
    price: 89.99,
    description: 'Portable Bluetooth speaker with deep bass and long battery life.',
    image: 'https://images.unsplash.com/photo-1573497019936-33067a7cf1f9',
    category: 'Electronics',
    rating: 4.5,
    stock: 40,
    tags: ['audio', 'speaker', 'bluetooth'],
  },
  {
    id: '7',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    description: 'Insulated water bottle that keeps drinks cold for 24 hours.',
    image: 'https://images.unsplash.com/photo-1509440011397-69a2cf33d3a9',
    category: 'Accessories',
    rating: 4.4,
    stock: 100,
    tags: ['bottle', 'water', 'accessory'],
  },
  {
    id: '8',
    name: 'Adjustable Dumbbell Set',
    price: 129.99,
    description: 'Adjustable dumbbells for a customized workout experience.',
    image: 'https://images.unsplash.com/photo-1583454110551-21a3d408ef7b',
    category: 'Fitness',
    rating: 4.7,
    stock: 25,
    tags: ['fitness', 'workout', 'dumbbells'],
  },
  {
    id: '9',
    name: 'Electric Standing Desk',
    price: 499.99,
    description: 'Height-adjustable desk with smooth motorized lift.',
    image: 'https://images.unsplash.com/photo-1587825140708-57e5099e80d1',
    category: 'Furniture',
    rating: 4.5,
    stock: 10,
    tags: ['furniture', 'desk', 'adjustable'],
  },
  {
    id: '10',
    name: 'Noise-Canceling Earbuds',
    price: 129.99,
    description: 'Compact earbuds with active noise canceling technology.',
    image: 'https://images.unsplash.com/photo-1573496777630-cad4e4c593d4',
    category: 'Electronics',
    rating: 4.4,
    stock: 45,
    tags: ['audio', 'earbuds', 'noise-canceling'],
  },
  {
    id: '11',
    name: 'Mountain Bike',
    price: 999.99,
    description: 'All-terrain mountain bike with durable frame and suspension.',
    image: 'https://images.unsplash.com/photo-1608131201886-03b9a96a0a3f',
    category: 'Sports',
    rating: 4.8,
    stock: 8,
    tags: ['bike', 'outdoor', 'sports'],
  },
  {
    id: '12',
    name: 'Leather Wallet',
    price: 49.99,
    description: 'Premium leather wallet with RFID protection.',
    image: 'https://images.unsplash.com/photo-1591375279253-074a40fcde3c',
    category: 'Accessories',
    rating: 4.3,
    stock: 75,
    tags: ['wallet', 'leather', 'accessory'],
  },
  {
    id: '13',
    name: 'Espresso Machine',
    price: 299.99,
    description: 'Automatic espresso machine for a perfect coffee experience.',
    image: 'https://images.unsplash.com/photo-1518979790150-955b19289b70',
    category: 'Kitchen',
    rating: 4.7,
    stock: 20,
    tags: ['coffee', 'kitchen', 'espresso'],
  },
  {
    id: '14',
    name: 'Running Shoes',
    price: 89.99,
    description: 'Lightweight running shoes with excellent cushioning.',
    image: 'https://images.unsplash.com/photo-1600267176161-2b3a0606cfdb',
    category: 'Footwear',
    rating: 4.6,
    stock: 50,
    tags: ['shoes', 'running', 'footwear'],
  },
  {
    id: '15',
    name: 'Wooden Dining Table',
    price: 699.99,
    description: 'Solid wood dining table with a rustic finish.',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb',
    category: 'Furniture',
    rating: 4.8,
    stock: 5,
    tags: ['furniture', 'dining', 'table'],
  },
  {
    id: '16',
    name: 'Smart Thermostat',
    price: 149.99,
    description: 'Energy-saving thermostat with Wi-Fi control.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df',
    category: 'Electronics',
    rating: 4.5,
    stock: 20,
    tags: ['thermostat', 'home', 'smart'],
  },
  {
    id: '17',
    name: 'Wireless Charger Pad',
    price: 29.99,
    description: 'Fast wireless charging pad for all Qi-enabled devices.',
    image: 'https://images.unsplash.com/photo-1570371513895-4ff3b4f27842',
    category: 'Electronics',
    rating: 4.6,
    stock: 60,
    tags: ['charger', 'wireless', 'electronics'],
  },
  {
    id: '18',
    name: 'Ceramic Flower Vase',
    price: 19.99,
    description: 'Elegant ceramic vase for home decor.',
    image: 'https://images.unsplash.com/photo-1518471715-1d8e6a4c8ff4',
    category: 'Home Decor',
    rating: 4.5,
    stock: 35,
    tags: ['vase', 'decor', 'ceramic'],
  },
  {
    id: '19',
    name: '4K Ultra HD TV',
    price: 799.99,
    description: 'Crystal-clear 4K display with smart features.',
    image: 'https://images.unsplash.com/photo-1588477403723-7ffb6b67c2d4',
    category: 'Electronics',
    rating: 4.7,
    stock: 15,
    tags: ['tv', 'electronics', '4k'],
  },
  {
    id: '20',
    name: 'Electric Kettle',
    price: 49.99,
    description: 'Fast-boiling kettle with automatic shut-off.',
    image: 'https://images.unsplash.com/photo-1601315309257-96f6fc6d4a62',
    category: 'Kitchen',
    rating: 4.6,
    stock: 40,
    tags: ['kettle', 'kitchen', 'appliance'],
  },
  {
    id: '21',
    name: 'Gaming Console',
    price: 499.99,
    description: 'Latest-gen console with immersive gaming experience.',
    image: 'https://images.unsplash.com/photo-1587202372775-f8d9b89e8512',
    category: 'Electronics',
    rating: 4.8,
    stock: 10,
    tags: ['gaming', 'console', 'tech'],
  },
  {
    id: '22',
    name: 'Foam Roller',
    price: 24.99,
    description: 'Essential tool for muscle recovery and relaxation.',
    image: 'https://images.unsplash.com/photo-1559628234-62a290021db8',
    category: 'Fitness',
    rating: 4.4,
    stock: 80,
    tags: ['fitness', 'recovery', 'roller'],
  },
  {
    id: '23',
    name: 'Electric Toothbrush',
    price: 49.99,
    description: 'Smart toothbrush with multiple cleaning modes.',
    image: 'https://images.unsplash.com/photo-1607950909820-c9ec48a6c42d',
    category: 'Personal Care',
    rating: 4.6,
    stock: 50,
    tags: ['toothbrush', 'electric', 'care'],
  },
  {
    id: '24',
    name: 'Laptop Backpack',
    price: 59.99,
    description: 'Water-resistant backpack with padded laptop compartment.',
    image: 'https://images.unsplash.com/photo-1581579435055-13eab165c24b',
    category: 'Accessories',
    rating: 4.5,
    stock: 60,
    tags: ['backpack', 'laptop', 'bag'],
  },
  {
    id: '25',
    name: 'Air Purifier',
    price: 129.99,
    description: 'HEPA filter air purifier for clean indoor air.',
    image: 'https://images.unsplash.com/photo-1604810033734-3cf59da1e5c1',
    category: 'Home',
    rating: 4.7,
    stock: 25,
    tags: ['air', 'purifier', 'home'],
  },
  {
    id: '26',
    name: 'Adjustable Yoga Block',
    price: 14.99,
    description: 'Supportive block for various yoga poses and flexibility.',
    image: 'https://images.unsplash.com/photo-1569937728384-921ef164d018',
    category: 'Fitness',
    rating: 4.3,
    stock: 30,
    tags: ['yoga', 'block', 'fitness'],
  },
  {
    id: '27',
    name: 'Travel Backpack',
    price: 89.99,
    description: 'Durable backpack for outdoor and travel needs.',
    image: 'https://images.unsplash.com/photo-1535551951406-a19828b0a76b',
    category: 'Accessories',
    rating: 4.7,
    stock: 35,
    tags: ['backpack', 'travel', 'outdoor'],
  },
  {
    id: '28',
    name: 'Smart LED Bulb',
    price: 19.99,
    description: 'Customizable light with smart features, compatible with Alexa.',
    image: 'https://images.unsplash.com/photo-1542332213-6b8da62c0499',
    category: 'Home',
    rating: 4.6,
    stock: 60,
    tags: ['bulb', 'smart', 'home'],
  },
  {
    id: '29',
    name: 'Adjustable Monitor Stand',
    price: 39.99,
    description: 'Ergonomic monitor stand with adjustable height.',
    image: 'https://images.unsplash.com/photo-1598979836541-3cb706eb26e5',
    category: 'Office',
    rating: 4.4,
    stock: 45,
    tags: ['stand', 'monitor', 'office'],
  },
  {
    id: '30',
    name: 'Robot Vacuum Cleaner',
    price: 199.99,
    description: 'Automatic vacuum cleaner with smart mapping.',
    image: 'https://images.unsplash.com/photo-1613667044586-557f1b7f7d6b',
    category: 'Home',
    rating: 4.7,
    stock: 20,
    tags: ['vacuum', 'robot', 'home'],
  },
];

export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  let filteredProducts = [...products];

  if (filters) {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        product => product.category === filters.category
      );
    }

    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.price >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        product => product.price <= filters.maxPrice!
      );
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
      }
    }
  }

  return filteredProducts;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return products.find(product => product.id === id) || null;
};