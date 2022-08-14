import { createAction } from '@reduxjs/toolkit';

import { TransferInvoiceType } from './types';

export const START_TRANSFER_INVOICE = 'START_TRANSFER_INVOICE';
export const SIGNED_TRANSFER_INVOICE = 'SIGNED_TRANSFER_INVOICE';
export const SUCCESS_TRANSFER_INVOICE = 'SUCCESS_TRANSFER_INVOICE';
export const FAILED_TRANSFER_INVOICE = 'FAILED_TRANSFER_INVOICE';
export const RESET_TRANSFER_INVOICE = 'RESET_TRANSFER_INVOICE';

export const startTransferInvoice = createAction<
  TransferInvoiceType,
  typeof START_TRANSFER_INVOICE
>(START_TRANSFER_INVOICE);

export const signedTransferInvoice = createAction<
  { txId: string },
  typeof SIGNED_TRANSFER_INVOICE
>(SIGNED_TRANSFER_INVOICE);

export const successTransferInvoice = createAction<
  void,
  typeof SUCCESS_TRANSFER_INVOICE
>(SUCCESS_TRANSFER_INVOICE);

export const failedTransferInvoice = createAction<
  Error | null,
  typeof FAILED_TRANSFER_INVOICE
>(FAILED_TRANSFER_INVOICE);

export const resetTransferInvoice = createAction<
  void,
  typeof RESET_TRANSFER_INVOICE
>(RESET_TRANSFER_INVOICE);

export type TransferInvoiceActions =
  | ReturnType<typeof startTransferInvoice>
  | ReturnType<typeof signedTransferInvoice>
  | ReturnType<typeof failedTransferInvoice>
  | ReturnType<typeof successTransferInvoice>
  | ReturnType<typeof resetTransferInvoice>;
