import { NotificationType } from './notification-type.enum';
import { NotificationClientInterface } from './notoification-client.interface';
import { SendpulseClient } from './sendpulse';

import { Invoice } from '../../models';
import { formatInvoiceAmount } from '../formatInvoiceAmount';
import { linkToAddress, linkToTransaction } from '../linkToTransaction';
import { formatTransactionId } from '../formatTransaction';
import { formatNumber } from '../formatNumber';

class Notifications {
  emailClient: NotificationClientInterface;

  constructor() {
    this.emailClient = new SendpulseClient();
  }

  async invoiceDeposited(
    email: string,
    chainId: number,
    invoice: Invoice,
    txHash: string,
  ) {
    const invoiceName =
      formatNumber(invoice.amount) +
      '$ transfer request' +
      (invoice.ref.length > 0 ? ' for ' + invoice.ref : '');
    await this.sendEmail(
      email,
      `${invoiceName} deposited`,
      NotificationType.InvoiceDeposited,
      {
        amount: formatInvoiceAmount(invoice, 'balance', chainId),
        transactionLink: linkToTransaction(txHash, chainId),
        sender: formatTransactionId(invoice.senderAddress),
        senderLink: linkToAddress(invoice.senderAddress, chainId)?.replace(
          'https://',
          '',
        ),
        // TODO: use dynamic domains
        invoiceLink: `https://alpha.transfersafe.net/invoices/${chainId}/${invoice.id}`,
        invoiceName,
      },
    );
  }

  async invoiceConfirmed(
    email: string,
    chainId: number,
    invoice: Invoice,
    txHash: string,
  ) {
    const invoiceName =
      formatNumber(invoice.amount) +
      '$ transfer' +
      (invoice.ref.length > 0 ? ' for ' + invoice.ref : '');

    await this.sendEmail(
      email,
      `${invoiceName} received`,
      NotificationType.InvoiceConfirmed,
      {
        amount: formatInvoiceAmount(invoice, 'paidAmount', chainId),
        transactionLink: linkToTransaction(txHash, chainId),
        sender: formatTransactionId(invoice.senderAddress),
        senderLink: linkToAddress(invoice.senderAddress, chainId)?.replace(
          'https://',
          '',
        ),
        // TODO: use dynamic domains
        invoiceLink: `https://alpha.transfersafe.net/invoices/${invoice.id}`,
        invoiceName,
      },
    );
  }

  private sendEmail(
    email: string,
    subject: string,
    notificationType: NotificationType,
    variables = {},
  ) {
    return this.emailClient.sendEmail(
      email,
      subject,
      notificationType,
      variables,
    );
  }
}

export default new Notifications();
