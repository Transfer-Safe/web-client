import { createAction } from '@reduxjs/toolkit';
import { InvoiceStruct } from '@transfer-safe/router/contracts/TransferSafeRouter';

export const CREATE_INVOICE = 'CREATE_INVOICE';

export const createInvoiceAction = createAction<
  {
    invoice: InvoiceStruct;
    transcationHash?: string;
  },
  typeof CREATE_INVOICE
>(CREATE_INVOICE);

export type CreateInvoiceActions = ReturnType<typeof createInvoiceAction>;
