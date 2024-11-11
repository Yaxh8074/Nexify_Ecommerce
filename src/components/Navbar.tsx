import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, UserIcon, LogOut, Search, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CurrencySelector } from './CurrencySelector';
import { Map } from './Map';

export const Navbar = () => {
  const { cart, user, setUser } = useStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    if (window.FB) {
      window.FB.logout();
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Nexify</h1>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
              >
                Products
              </Link>
              <Link
                to="/privacy-policy"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearch} className="relative mt-2">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowMap(!showMap)}
                className="p-2 rounded-full hover:bg-gray-100 relative"
                aria-label="Toggle map"
              >
                <MapPin className="h-6 w-6 text-gray-600" />
              </button>
              {showMap && <Map />}
            </div>
            <CurrencySelector />
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center">
                <img
                  src={user.picture || ''}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="ml-2 p-2 rounded-full hover:bg-gray-100"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <UserIcon className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ShoppingCart, UserIcon, LogOut, Search, MapPin } from 'lucide-react';
// import { useStore } from '../store/useStore';
// import { CurrencySelector } from './CurrencySelector';
// import { Map } from './Map';

// export const Navbar = () => {
//   const { cart, user, setUser } = useStore();
//   const navigate = useNavigate();
//   //const [searchQuery, setSearchQuery] = useState('');
//   const [showMap, setShowMap] = useState(false);
//   const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

//   const handleLogout = () => {
//     setUser(null);
//     if (window.FB) {
//       window.FB.logout();
//     }
//   };

//   // const handleSearch = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (searchQuery.trim()) {
//   //     navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
//   //   }
//   // };

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0 flex items-center">
//               <h1 className="text-xl font-bold text-gray-800">Nexify</h1>
//             </Link>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               <Link
//                 to="/"
//                 className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/products"
//                 className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300"
//               >
//                 Products
//               </Link>
//             </div>
//           </div>

//           {/* <div className="flex-1 max-w-lg mx-4">
//             <form onSubmit={handleSearch} className="relative mt-2">
//               <input
//                 type="search"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               <button
//                 type="submit"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 <Search className="h-5 w-5" />
//               </button>
//             </form>
//           </div> */}

//           <div className="flex items-center space-x-6">
//             <div className="relative">
//               <button
//                 onClick={() => setShowMap(!showMap)}
//                 className="p-2 rounded-full hover:bg-gray-100 relative"
//                 aria-label="Toggle map"
//               >
//                 <MapPin className="h-6 w-6 text-gray-600" />
//               </button>
//               {showMap && <Map />}
//             </div>
//             <CurrencySelector />
//             <Link
//               to="/cart"
//               className="p-2 rounded-full hover:bg-gray-100 relative"
//             >
//               <ShoppingCart className="h-6 w-6" />
//               {cartItemsCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
//                   {cartItemsCount}
//                 </span>
//               )}
//             </Link>
//             {user ? (
//               <div className="flex items-center">
//                 <img
//                   src={user.picture || ''}
//                   alt={user.name}
//                   className="h-8 w-8 rounded-full"
//                 />
//                 <button
//                   onClick={handleLogout}
//                   className="ml-2 p-2 rounded-full hover:bg-gray-100"
//                 >
//                   <LogOut className="h-5 w-5" />
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/login"
//                 className="p-2 rounded-full hover:bg-gray-100"
//               >
//                 <UserIcon className="h-6 w-6" />
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };