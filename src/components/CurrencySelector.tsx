import React from 'react';
import { SUPPORTED_CURRENCIES, type CurrencyCode } from '../api/currency';
import { useStore } from '../store/useStore';

export const CurrencySelector = () => {
  const { currency, setCurrency } = useStore();

  return (
    <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-lg">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="block rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
      >
        {Object.keys(SUPPORTED_CURRENCIES).map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <img
        src={`https://flagsapi.com/${SUPPORTED_CURRENCIES[currency]}/flat/32.png`}
        alt={`${currency} flag`}
        className="h-5 w-5 rounded-sm object-cover"
      />
    </div>
  );
};