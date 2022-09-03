import { InvoiceConfirmedEvent } from '@transfer-safe/router/contracts/TransferSafeRouter';

import { dencryptEmail } from '../encryptEmail';
import { loadInvoice } from '../ethers';
import notifications from '../notifications/notifications';

export const handleConfirm = async (
  chainId: number,
  txHash: string,
  event: InvoiceConfirmedEvent,
) => {
  const [invoiceStruct] = event.args;
  const invoice = await loadInvoice(invoiceStruct.id, chainId);
  if (invoice.receipientEmail.length < 1) {
    return;
  }
  if (!invoice.paid) {
    return;
  }
  const email = dencryptEmail(invoice.receipientEmail);
  await notifications.invoiceConfirmed(email, chainId, invoice, txHash);
};
