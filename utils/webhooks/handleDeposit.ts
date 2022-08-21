import { InvoiceDepositedEvent } from '@transfer-safe/router/contracts/TransferSafeRouter';

import { dencryptEmail } from '../encryptEmail';
import { loadInvoice } from '../ethers';
import notifications from '../notifications/notifications';

export const handleDeposit = async (
  chainId: number,
  txHash: string,
  event: InvoiceDepositedEvent,
) => {
  const [invoiceId] = event.args;
  const invoice = await loadInvoice(invoiceId, chainId);
  if (invoice.receipientEmail.length < 1) {
    return;
  }
  if (invoice.paid) {
    return;
  }
  if (!invoice.deposited) {
    return;
  }
  const email = dencryptEmail(invoice.receipientEmail);
  await notifications.invoiceDeposited(email, chainId, invoice, txHash);
};
