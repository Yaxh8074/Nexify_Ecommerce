interface NewsletterResponse {
  success: boolean;
  message: string;
}

export const subscribeToNewsletter = async (email: string): Promise<NewsletterResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email address');
  }

  return {
    success: true,
    message: 'Successfully subscribed to newsletter!',
  };
};