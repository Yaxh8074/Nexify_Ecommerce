import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Products = lazy(() => import('./pages/Products').then(module => ({ default: module.Products })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(module => ({ default: module.ProductDetail })));
const Cart = lazy(() => import('./pages/Cart').then(module => ({ default: module.Cart })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Suspense>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;


// import { lazy, Suspense } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { Navbar } from './components/Navbar';

// const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
// const Products = lazy(() => import('./pages/Products').then(module => ({ default: module.Products })));
// const ProductDetail = lazy(() => import('./pages/ProductDetail').then(module => ({ default: module.ProductDetail })));
// const Cart = lazy(() => import('./pages/Cart').then(module => ({ default: module.Cart })));
// const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));


// const PageLoader = () => (
//   <div className="min-h-screen flex items-center justify-center">
//     <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//   </div>
// );

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main>
//         <Suspense fallback={<PageLoader />}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/products/:id" element={<ProductDetail />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </Suspense>
//       </main>
//       <Toaster position="bottom-right" />
//     </div>
//   );
// }

// export default App;