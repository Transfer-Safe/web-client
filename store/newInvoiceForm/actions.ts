import { createAction } from '@reduxjs/toolkit';

import { NewInvoiceFormState } from './types';

export const NEW_INVOICE_NEXT_STEP = 'NEW_INVOICE_NEXT_STEP';
export const NEW_INVOICE_UPDATE = 'NEW_INVOICE_UPDATE';

export const newInvoiceNextStep = createAction<
  void,
  typeof NEW_INVOICE_NEXT_STEP
>(NEW_INVOICE_NEXT_STEP);

export const newInvoiceUpdate = createAction<
  Partial<Omit<NewInvoiceFormState, 'step'>>,
  typeof NEW_INVOICE_UPDATE
>(NEW_INVOICE_UPDATE);

export type NewInvoiceFormActions =
  | ReturnType<typeof newInvoiceNextStep>
  | ReturnType<typeof newInvoiceUpdate>;
