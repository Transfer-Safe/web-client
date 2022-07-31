import { createAction } from '@reduxjs/toolkit';

export const NEW_INVOICE_NEXT_STEP = 'NEW_INVOICE_NEXT_STEP';

export const newInvoiceNextStep = createAction<
  void,
  typeof NEW_INVOICE_NEXT_STEP
>(NEW_INVOICE_NEXT_STEP);

export type NewInvoiceFormActions = ReturnType<typeof newInvoiceNextStep>;
