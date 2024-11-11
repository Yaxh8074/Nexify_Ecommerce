import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, Headphones, ArrowRight } from 'lucide-react';
import { Newsletter } from '../components/Newsletter';

export const Home = () => {
  return (
    <div>
      <div className="hero-parallax">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=3270&auto=format&fit=crop"
            alt="Hero"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 from-black/70 to-black/50"></div>
           {/* bg-gradient-to-r */}
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Welcome to <span className="text-blue-400">Nexify</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Discover our curated collection of premium products. From fashion to electronics,
            find everything you need with just a few clicks.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white/10"
            >
              View Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="relative p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 bg-blue-500 rounded-full opacity-10"></div>
                <feature.icon className="h-8 w-8 text-blue-600" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
            <p className="mt-4 text-lg text-gray-600">
              We offer the best shopping experience with premium products and excellent service.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
};

const features = [
  {
    title: 'Fast Delivery',
    description: 'Get your products delivered to your doorstep within 24 hours.',
    icon: Truck,
  },
  {
    title: 'Secure Payments',
    description: 'Shop with confidence using our secure payment system.',
    icon: Shield,
  },
  {
    title: '24/7 Support',
    description: 'Our customer support team is always here to help you.',
    icon: Headphones,
  },
  {
    title: 'Easy Returns',
    description: '30-day return policy for all products.',
    icon: ShoppingBag,
  },
];

const benefits = [
  {
    icon: '🌟',
    title: 'Premium Quality',
    description: 'All our products are carefully selected to ensure the highest quality standards.',
  },
  {
    icon: '🎁',
    title: 'Special Offers',
    description: 'Regular discounts and exclusive deals for our loyal customers.',
  },
  {
    icon: '🌍',
    title: 'Global Shipping',
    description: 'We deliver to customers worldwide with tracked shipping options.',
  },
];