import { chain } from 'wagmi';

import { CryptoCurrency, CurrencyCode } from '../models';

type ChainCurrencies = Record<CurrencyCode, string | undefined>;

export const CURRENCIES: Record<
  CurrencyCode,
  Omit<CryptoCurrency, 'address'>
> = {
  [CurrencyCode.DAI]: {
    code: CurrencyCode.DAI,
  },
  [CurrencyCode.USDT]: {
    code: CurrencyCode.USDT,
  },
};

export const CURRENCIES_ADDRESSES: Record<number, ChainCurrencies> = {
  [chain.polygonMumbai.id]: {
    [CurrencyCode.DAI]: '0xd393b1e02da9831ff419e22ea105aae4c47e1253',
    [CurrencyCode.USDT]: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
  },
};

export const CURRENCIES_CHAINLINK_ADDRESSES: Record<
  number,
  { native: string; currencies: ChainCurrencies }
> = {
  [chain.polygonMumbai.id]: {
    native: '0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada',
    currencies: {
      [CurrencyCode.DAI]: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      [CurrencyCode.USDT]: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    },
  },
};
