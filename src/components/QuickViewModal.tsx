import React from 'react';
import { X, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { Price } from './Price';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success('Added to cart!');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <button
                onClick={handleToggleWishlist}
                className={`absolute top-4 left-4 p-2 rounded-full ${
                  isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
                }`}
              >
                <Heart className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <Price amount={product.price} className="text-xl font-semibold text-gray-900 mb-4" />
              
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Category</span>
                  <span className="text-sm font-medium">{product.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Stock</span>
                  <span className="text-sm font-medium">{product.stock} units</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full flex items-center justify-center px-4 py-2 rounded-md ${
                    product.stock > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <Link
                  to={`/products/${product.id}`}
                  className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={onClose}
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};