import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { convertCurrency, type CurrencyCode } from '../api/currency';

interface PriceProps {
  amount: number;
  className?: string;
}

export const Price: React.FC<PriceProps> = ({ amount, className = '' }) => {
  const currency = useStore(state => state.currency);
  const [convertedAmount, setConvertedAmount] = useState(amount);

  useEffect(() => {
    const convert = async () => {
      if (currency !== 'USD') {
        const converted = await convertCurrency(amount, 'USD', currency);
        setConvertedAmount(converted);
      } else {
        setConvertedAmount(amount);
      }
    };

    convert();
  }, [amount, currency]);

  const formatPrice = (price: number, curr: CurrencyCode) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
    }).format(price);
  };

  return (
    <span className={className}>
      {formatPrice(convertedAmount, currency)}
    </span>
  );
};