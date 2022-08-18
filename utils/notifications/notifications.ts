import { NotificationType } from './notification-type.enum';
import { NotificationClientInterface } from './notoification-client.interface';
import { SendpulseClient } from './sendpulse';

import { Invoice } from '../../models';
import { formatInvoiceAmount } from '../formatInvoiceAmount';
import { linkToAddress, linkToTransaction } from '../linkToTransaction';
import { formatTransactionId } from '../formatTransaction';

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
    await this.sendEmail(
      email,
      'Invoice deposited',
      NotificationType.InvoiceDeposited,
      {
        amount: formatInvoiceAmount(invoice, 'balance', chainId),
        transactionLink: linkToTransaction(txHash, chainId),
        sender: formatTransactionId(invoice.senderAddress),
        senderLink: linkToAddress(invoice.senderAddress, chainId),
        // TODO: use dynamic domains
        invoiceLink: `https://alpha.transfersafe.net/invoices/${invoice.id}`,
      },
    );
  }

  async invoiceConfirmed(
    email: string,
    chainId: number,
    invoice: Invoice,
    txHash: string,
  ) {
    await this.sendEmail(
      email,
      'Transfer completed',
      NotificationType.InvoiceConfirmed,
      {
        amount: formatInvoiceAmount(invoice, 'paidAmount', chainId),
        transactionLink: linkToTransaction(txHash, chainId),
        sender: formatTransactionId(invoice.senderAddress),
        senderLink: linkToAddress(invoice.senderAddress, chainId),
        // TODO: use dynamic domains
        invoiceLink: `https://alpha.transfersafe.net/invoices/${invoice.id}`,
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
