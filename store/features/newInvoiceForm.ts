import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CurrencyCode } from '../../models';

export enum NewInvoiceFormStep {
  amount,
  reference,
  notifications,
  currency,
  type,
  create,
}

export interface NewInvoiceFormState {
  step: NewInvoiceFormStep;
  email?: string;
  reference?: string;
  amount: number;
  isNativeCurrencyEnabled: boolean;
  currencies: CurrencyCode[];
  instantTransfer?: boolean;
}

export const NEW_INVOICES_STEPS_ORDER: NewInvoiceFormStep[] = [
  NewInvoiceFormStep.amount,
  NewInvoiceFormStep.reference,
  NewInvoiceFormStep.notifications,
  NewInvoiceFormStep.currency,
  NewInvoiceFormStep.type,
  NewInvoiceFormStep.create,
];

const initialState: NewInvoiceFormState = {
  step: NewInvoiceFormStep.amount,
  amount: 0,
  isNativeCurrencyEnabled: true,
  currencies: [],
};

const newInvoiceForm = createSlice({
  name: 'newInvoiceForm',
  initialState,
  reducers: {
    newInvoiceNextStep(state) {
      const currentIndex = NEW_INVOICES_STEPS_ORDER.indexOf(state.step);
      if (currentIndex < 0) {
        return;
      }
      const nextIndex = currentIndex + 1;
      if (nextIndex >= NEW_INVOICES_STEPS_ORDER.length) {
        return;
      }
      state.step = NEW_INVOICES_STEPS_ORDER[nextIndex];
    },
    newInvoiceUpdate(
      state,
      action: PayloadAction<Partial<Omit<NewInvoiceFormState, 'step'>>>,
    ) {
      Object.assign(state, action.payload);
    },
    newInvoiceGoToStep(state, action: PayloadAction<NewInvoiceFormStep>) {
      state.step = action.payload;
    },
  },
});

export default newInvoiceForm.reducer;
export const { newInvoiceNextStep, newInvoiceGoToStep, newInvoiceUpdate } =
  newInvoiceForm.actions;
