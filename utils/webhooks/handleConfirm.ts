import { TransferSafeRouter } from '@transfer-safe/router';
import { TransactionDescription } from 'ethers/lib/utils';

import { dencryptEmail } from '../encryptEmail';
import { loadInvoice } from '../ethers';
import notifications from '../notifications/notifications';

export const handleConfirm = async (
  chainId: number,
  txHash: string,
  transaction: TransactionDescription,
) => {
  const [invoiceId] = transaction.args as Parameters<
    TransferSafeRouter['confirmInvoice']
  >;
  const invoice = await loadInvoice(await invoiceId, chainId);
  if (invoice.receipientEmail.length < 1) {
    return;
  }
  const email = dencryptEmail(invoice.receipientEmail);
  await notifications.invoiceConfirmed(email, chainId, invoice, txHash);
};
