import React, { memo, useState } from 'react';
import { useStore } from '../store/useStore';
import { Product } from '../types';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Price } from './Price';
import { QuickViewModal } from './QuickViewModal';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [showQuickView, setShowQuickView] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ ...product, quantity: 1 });
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowQuickView(true);
  };

  return (
    <>
      <Link
        to={`/products/${product.id}`}
        className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full ${
                isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
              }`}
            >
              <Heart className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleQuickView}
              className="p-2 rounded-full bg-white text-gray-600 hover:bg-gray-100"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 mt-1 text-sm line-clamp-2">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <Price amount={product.price} className="text-xl font-bold text-gray-900" />
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                product.stock > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
          {product.stock < 10 && product.stock > 0 && (
            <p className="mt-2 text-sm text-orange-600">Only {product.stock} left in stock!</p>
          )}
        </div>
      </Link>
      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
});