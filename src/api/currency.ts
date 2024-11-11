import { toast } from 'react-hot-toast';

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

export const SUPPORTED_CURRENCIES = {
  USD: "US",
  EUR: "FR",
  JPY: "JP",
  GBP: "GB",
  AUD: "AU",
  CAD: "CA",
  CHF: "CH",
  CNY: "CN",
  SEK: "SE",
  NZD: "NZ",
  MXN: "MX",
  SGD: "SG",
  HKD: "HK",
  NOK: "BV",
  KRW: "KR",
  TRY: "TR",
  INR: "IN",
  RUB: "RU",
  BRL: "BR",
  ZAR: "ZA"
} as const;

export type CurrencyCode = keyof typeof SUPPORTED_CURRENCIES;

export const convertCurrency = async (
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): Promise<number> => {
  try {
    const response = await fetch(`${BASE_URL}/${from.toLowerCase()}.json`);
    const data = await response.json();
    const rate = data[from.toLowerCase()][to.toLowerCase()];
    return Number((amount * rate).toFixed(2));
  } catch (error) {
    toast.error('Failed to convert currency');
    return amount;
  }
};

export const getFlag = (currencyCode: CurrencyCode): string => {
  const countryCode = SUPPORTED_CURRENCIES[currencyCode];
  return `https://flagsapi.com/${countryCode}/flat/64.png`;
};