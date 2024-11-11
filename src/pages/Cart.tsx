import React from 'react';
import { useStore } from '../store/useStore';
import { Trash2, Plus, Minus } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_publishable_key'); // Replace with your Stripe publishable key

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Replace with your actual checkout endpoint
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Add some products to your cart to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
      <div className="bg-white shadow-lg rounded-lg">
        <div className="p-6 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-6 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-b-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

// import React from 'react';
// import { useStore } from '../store/useStore';
// import { Trash2, Plus, Minus } from 'lucide-react';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('your_publishable_key'); // Replace with your Stripe publishable key

// export const Cart = () => {
//   const { cart, removeFromCart, updateQuantity } = useStore();
  
//   const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleCheckout = async () => {
//     try {
//       const stripe = await stripePromise;
//       if (!stripe) throw new Error('Stripe failed to load');

//       // Replace with your actual checkout endpoint
//       const response = await fetch('/api/create-checkout-session', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ items: cart }),
//       });

//       const session = await response.json();

//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (result.error) {
//         throw new Error(result.error.message);
//       }
//     } catch (error) {
//       console.error('Error during checkout:', error);
//     }
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
//           <p className="mt-2 text-gray-600">Add some products to your cart to get started.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <h2 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h2>
//       <div className="bg-white shadow-lg rounded-lg">
//         <div className="p-6 space-y-6">
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between border-b pb-6 last:border-b-0 last:pb-0"
//             >
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900">
//                     {item.name}
//                   </h3>
//                   <p className="text-gray-600">${item.price.toFixed(2)}</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() =>
//                       updateQuantity(item.id, Math.max(1, item.quantity - 1))
//                     }
//                     className="p-1 rounded-full hover:bg-gray-100"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </button>
//                   <span className="w-8 text-center">{item.quantity}</span>
//                   <button
//                     onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                     className="p-1 rounded-full hover:bg-gray-100"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="p-2 text-red-500 hover:bg-red-50 rounded-full"
//                 >
//                   <Trash2 className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="bg-gray-50 p-6 rounded-b-lg">
//           <div className="flex justify-between items-center">
//             <span className="text-lg font-medium text-gray-900">Total</span>
//             <span className="text-2xl font-bold text-gray-900">
//               ${total.toFixed(2)}
//             </span>
//           </div>
//           <button
//             onClick={handleCheckout}
//             className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };