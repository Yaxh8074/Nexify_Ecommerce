import { Product, ProductFilters } from '../types';

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    description: 'High-quality wireless headphones with noise cancellation.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60',
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
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60',
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
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=60',
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
    image: 'https://images.unsplash.com/photo-1688578735427-994ecdea3ea4',
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
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=60',
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
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=60',
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
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=60',
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
    image: 'https://images.unsplash.com/photo-1623874228601-f4193c7b1818?w=600&auto=format&fit=crop&q=60',
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
    image: 'https://images.unsplash.com/photo-1632923945531-7416f29116ca?w=600&auto=format&fit=crop&q=60',
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
    image: 'https://images.unsplash.com/photo-1505236273191-1dce886b01e9?w=600&auto=format&fit=crop&q=60',
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
    image: 'https://images.unsplash.com/photo-1534150034764-046bf225d3fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fHwy',
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
    image: 'https://images.unsplash.com/photo-1629958513881-a086d21383cd',
    category: 'Accessories',
    rating: 4.3,
    stock: 75,
    tags: ['wallet', 'leather', 'accessory'],
  }
];

interface PaginatedResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export const getProducts = async (
  filters?: ProductFilters & { page?: number; limit?: number }
): Promise<PaginatedResponse> => {
  let filteredProducts = [...products];
  const page = filters?.page || 1;
  const limit = filters?.limit || 6;

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

    if (filters.category && filters.category !== 'All') {
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

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / limit);

  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    totalPages
  };
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return products.find(product => product.id === id) || null;
};