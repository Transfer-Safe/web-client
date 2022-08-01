export enum CurrencyCode {
  USDT = 'USDT',
  DAI = 'DAI',
}

export interface CryptoCurrency {
  code: CurrencyCode;
  address: string;
  icon?: string;
}
