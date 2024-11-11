import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Facebook } from 'lucide-react';
import toast from 'react-hot-toast';
import { initFacebookSdk, loginWithFacebook, getFacebookUserData } from '../utils/facebook';

export const Login = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    const initFB = async () => {
      try {
        await initFacebookSdk();
        setIsLoading(false);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to initialize Facebook login';
        console.error('Failed to initialize Facebook SDK:', error);
        setInitError(errorMessage);
        toast.error(errorMessage);
        setIsLoading(false);
      }
    };

    initFB();
  }, []);

  const handleFacebookLogin = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const authResponse = await loginWithFacebook();
      const userData = await getFacebookUserData(authResponse.accessToken);
      
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        picture: userData.picture?.data?.url,
        wishlist: [],
      });
      
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect with Facebook';
      console.error('Facebook Login Error:', error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-red-600 mb-4">{initError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-blue-600">Nexify</h1>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Continue with social
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleFacebookLogin}
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Facebook className="w-5 h-5 mr-2 text-blue-600" />
                {isLoading ? 'Loading...' : 'Continue with Facebook'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useStore } from '../store/useStore';
// import { Facebook } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { initFacebookSdk, loginWithFacebook, getFacebookUserData } from '../utils/facebook';

// export const Login = () => {
//   const navigate = useNavigate();
//   const setUser = useStore((state) => state.setUser);

//   useEffect(() => {
//     initFacebookSdk();
//   }, []);

//   const handleFacebookLogin = async () => {
//     try {
//       const authResponse = await loginWithFacebook();
//       const userData = await getFacebookUserData(authResponse.accessToken);
      
//       setUser({
//         id: userData.id,
//         name: userData.name,
//         email: userData.email,
//         picture: userData.picture?.data?.url,
//         wishlist: [],
//       });
      
//       toast.success('Successfully logged in!');
//       navigate('/');
//     } catch (error) {
//       console.error('Facebook Login Error:', error);
//       toast.error('Failed to connect with Facebook. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h1 className="text-center text-3xl font-extrabold text-blue-600">Nexify</h1>
//         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//           Sign in to your account
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Continue with social
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <button
//                 onClick={handleFacebookLogin}
//                 className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <Facebook className="w-5 h-5 mr-2 text-blue-600" />
//                 Continue with Facebook
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };