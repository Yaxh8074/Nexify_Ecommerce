import React, { useEffect } from 'react';
import { initFacebookSdk } from '../utils/facebook';

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  useEffect(() => {
    const initFacebook = async () => {
      await initFacebookSdk();
      // Parse XFBML after SDK is initialized
      if (window.FB) {
        window.FB.XFBML.parse();
      }
    };

    initFacebook();
  }, [productId]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Comments</h3>
        <div 
          className="fb-share-button" 
          data-href={`${window.location.origin}/products/${productId}`}
          data-layout="button_count"
          data-size="large"
        ></div>
      </div>
      
      <div
        className="fb-comments"
        data-href={`${window.location.origin}/products/${productId}`}
        data-width="100%"
        data-numposts="10"
        data-order-by="reverse_time"
      ></div>
    </div>
  );
};