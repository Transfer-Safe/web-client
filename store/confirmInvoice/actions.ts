import { createAction } from '@reduxjs/toolkit';

export const START_CONFIRM_INVOICE = 'START_CONFIRM_INVOICE';
export const SIGNED_CONFIRM_INVOICE = 'SIGNED_CONFIRM_INVOICE';
export const SUCCESS_CONFIRM_INVOICE = 'SUCCESS_CONFIRM_INVOICE';
export const FAILED_CONFIRM_INVOICE = 'FAILED_CONFIRM_INVOICE';
export const RESET_CONFIRM_INVOICE = 'RESET_CONFIRM_INVOICE';

export const startConfirmInvoice = createAction<
  void,
  typeof START_CONFIRM_INVOICE
>(START_CONFIRM_INVOICE);

export const signedConfirmInvoice = createAction<
  { txid: string },
  typeof SIGNED_CONFIRM_INVOICE
>(SIGNED_CONFIRM_INVOICE);

export const successConfirmInvoice = createAction<
  void,
  typeof SUCCESS_CONFIRM_INVOICE
>(SUCCESS_CONFIRM_INVOICE);

export const failedConfirmInvoice = createAction<
  Error | null,
  typeof FAILED_CONFIRM_INVOICE
>(FAILED_CONFIRM_INVOICE);

export const resetConfirmInvoice = createAction<
  void,
  typeof RESET_CONFIRM_INVOICE
>(RESET_CONFIRM_INVOICE);

export type ConfirmInvoiceAction =
  | ReturnType<typeof startConfirmInvoice>
  | ReturnType<typeof successConfirmInvoice>
  | ReturnType<typeof failedConfirmInvoice>
  | ReturnType<typeof resetConfirmInvoice>
  | ReturnType<typeof signedConfirmInvoice>;
