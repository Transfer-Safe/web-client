import assert from 'assert';

import { formatNumber } from './formatNumber';

import { chains } from '../config';
import { Invoice } from '../models';

export const formatInvoiceAmount = (
  invoice: Invoice,
  field: keyof Pick<Invoice, 'balance' | 'paidAmount' | 'refundedAmount'>,
  chainId: number,
) => {
  const amount = invoice[field];
  const chain = chains.find((c) => c.id === chainId);
  assert(chain, `Chain with id ${chainId} not found`);

  const formattedNumber = formatNumber(amount);
  // TODO: support currencies
  const currencyCode = chain.nativeCurrency?.name || 'MATIC';
  return [formattedNumber, currencyCode].join(' ');
};
