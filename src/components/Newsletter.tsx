import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { subscribeToNewsletter } from '../api/newsletter';
import toast from 'react-hot-toast';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await subscribeToNewsletter(email);
      toast.success(response.message);
      setEmail('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Mail className="mx-auto h-12 w-12 mb-4" />
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-blue-100 mb-8">
            Get the latest updates on new products and special offers!
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};