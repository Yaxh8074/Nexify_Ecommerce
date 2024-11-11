interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: 'user1',
    userName: 'John Doe',
    rating: 4,
    comment: 'Great sound quality and comfortable to wear for long periods.',
    date: '2024-02-15',
    helpful: 12,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
    ],
  },
];

export const getProductReviews = async (productId: string): Promise<Review[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockReviews.filter(review => review.productId === productId);
};

export const addReview = async (review: Omit<Review, 'id' | 'date' | 'helpful'>): Promise<Review> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const newReview: Review = {
    ...review,
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString().split('T')[0],
    helpful: 0,
  };
  mockReviews.push(newReview);
  return newReview;
};