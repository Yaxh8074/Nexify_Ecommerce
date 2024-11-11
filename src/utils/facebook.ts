// Types for Facebook SDK
interface FacebookSDK {
  init: (params: any) => void;
  login: (callback: (response: any) => void, params: any) => void;
  getLoginStatus: (callback: (response: any) => void) => void;
  api: (path: string, params: any, callback: (response: any) => void) => void;
  XFBML: {
    parse: (element?: HTMLElement) => void;
  };
}

declare global {
  interface Window {
    FB: FacebookSDK;
    fbAsyncInit: () => void;
  }
}

let fbInitialized = false;

export const initFacebookSdk = () => {
  return new Promise<void>((resolve) => {
    // If FB SDK is already initialized, resolve immediately
    if (fbInitialized) {
      resolve();
      return;
    }

    // Load the SDK asynchronously
    const loadSdk = () => {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    // Initialize the SDK
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '8460951030687610',
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });

      // Parse XFBML for social plugins
      window.FB.XFBML.parse();

      // Check login status
      window.FB.getLoginStatus(() => {
        fbInitialized = true;
        resolve();
      });
    };

    // Load SDK if not already present
    if (typeof window.FB === 'undefined') {
      loadSdk();
    } else {
      window.FB.XFBML.parse();
      fbInitialized = true;
      resolve();
    }
  });
};

export const loginWithFacebook = () => {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error('Facebook SDK not initialized'));
      return;
    }

    window.FB.login((response) => {
      if (response.authResponse) {
        resolve(response.authResponse);
      } else {
        reject('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'email,public_profile' });
  });
};

export const getFacebookUserData = (accessToken: string) => {
  return new Promise((resolve, reject) => {
    if (!window.FB) {
      reject(new Error('Facebook SDK not initialized'));
      return;
    }

    window.FB.api(
      '/me',
      { fields: 'id,name,email,picture', access_token: accessToken },
      (response) => {
        if (!response || response.error) {
          reject(response?.error || 'Failed to get user data');
        } else {
          resolve(response);
        }
      }
    );
  });
};

// Helper function to refresh social plugins
export const refreshSocialPlugins = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
};

// export const initFacebookSdk = () => {
//   return new Promise<void>((resolve) => {
//     // Wait for the Facebook SDK to be loaded
//     window.fbAsyncInit = function() {
//       FB.init({
//         appId: '8460951030687610',
//         cookie: true,
//         xfbml: true,
//         version: 'v18.0'
//       });
      
//       resolve();
//     };

//     // Load the SDK asynchronously if not already loaded
//     if (typeof FB === 'undefined') {
//       const script = document.createElement('script');
//       script.src = 'https://connect.facebook.net/en_US/sdk.js';
//       script.async = true;
//       script.defer = true;
//       document.body.appendChild(script);
//     } else {
//       resolve();
//     }
//   });
// };