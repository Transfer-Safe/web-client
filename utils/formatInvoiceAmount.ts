import assert from 'assert';

import { formatNumber } from './formatNumber';

import { Invoice } from '../models';
import { getWagmiConfig } from '../config';

export const formatInvoiceAmount = (
  invoice: Invoice,
  field: keyof Pick<Invoice, 'balance' | 'paidAmount' | 'refundedAmount'>,
  chainId: number,
) => {
  const { chains } = getWagmiConfig();
  const amount = invoice[field];
  const chain = chains.find((c) => c.id === chainId);
  assert(chain, `Chain with id ${chainId} not found`);

  const formattedNumber = formatNumber(amount);
  // TODO: support currencies
  const currencyCode = chain.nativeCurrency?.name || 'MATIC';
  return [formattedNumber, currencyCode].join(' ');
};
