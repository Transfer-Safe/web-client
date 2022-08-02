import { createAction } from '@reduxjs/toolkit';

import { NewInvoiceFormState, NewInvoiceFormStep } from './types';

export const NEW_INVOICE_NEXT_STEP = 'NEW_INVOICE_NEXT_STEP';
export const NEW_INVOICE_GOTO_STEP = 'NEW_INVOICE_GOTO_STEP';
export const NEW_INVOICE_UPDATE = 'NEW_INVOICE_UPDATE';

export const newInvoiceNextStep = createAction<
  void,
  typeof NEW_INVOICE_NEXT_STEP
>(NEW_INVOICE_NEXT_STEP);

export const newInvoiceUpdate = createAction<
  Partial<Omit<NewInvoiceFormState, 'step'>>,
  typeof NEW_INVOICE_UPDATE
>(NEW_INVOICE_UPDATE);

export const newInvoiceGoToStep = createAction<
  NewInvoiceFormStep,
  typeof NEW_INVOICE_GOTO_STEP
>(NEW_INVOICE_GOTO_STEP);

export type NewInvoiceFormActions =
  | ReturnType<typeof newInvoiceNextStep>
  | ReturnType<typeof newInvoiceUpdate>
  | ReturnType<typeof newInvoiceGoToStep>;
