import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { getProductById } from '../api/products';
import { useStore } from '../store/useStore';
import { Product } from '../types';
import { Price } from '../components/Price';
import { ProductReviews } from '../components/ProductReviews';
import toast from 'react-hot-toast';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = id ? wishlist.includes(id) : false;

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        }
      } catch (error) {
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
      toast.success('Added to cart!');
    }
  };

  const handleToggleWishlist = () => {
    if (id) {
      toggleWishlist(id);
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
            loading="eager"
          />
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-4 right-4 p-2 rounded-full ${
              isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
            }`}
          >
            <Heart className="h-6 w-6" fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Product Info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>
          
          <div className="mt-3 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-500">
              {product.rating} out of 5 stars
            </p>
          </div>

          <div className="mt-6">
            <Price amount={product.price} className="text-3xl font-bold text-gray-900" />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <div className="mt-2 prose prose-sm text-gray-500">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-8 flex items-center">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center px-8 py-3 rounded-md text-base font-medium ${
                product.stock > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          {product.stock < 10 && product.stock > 0 && (
            <p className="mt-4 text-sm text-orange-600">
              Only {product.stock} left in stock!
            </p>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Details</h3>
            <div className="mt-4">
              <ul className="pl-4 list-disc space-y-2 text-sm text-gray-600">
                <li>Category: {product.category}</li>
                <li>Tags: {product.tags.join(', ')}</li>
                <li>Stock: {product.stock} units</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Product Reviews Section */}
      <div className="mt-16">
        <ProductReviews productId={product.id} />
      </div>
    </div>
  );
};