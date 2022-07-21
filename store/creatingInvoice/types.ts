import { InvoiceStruct } from '@transfer-safe/router/contracts/TransferSafeRouter';

export interface CreatingInvoiceState {
  invoice?: InvoiceStruct;
  transcationHash?: string;
}
