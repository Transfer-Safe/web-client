import {
  NewInvoiceFormActions,
  NEW_INVOICE_GOTO_STEP,
  NEW_INVOICE_NEXT_STEP,
  NEW_INVOICE_UPDATE,
} from './actions';
import { NewInvoiceFormState, NewInvoiceFormStep } from './types';

export const initialState: NewInvoiceFormState = {
  step: NewInvoiceFormStep.amount,
  amount: 0,
  isNativeCurrencyEnabled: true,
  currencies: [],
};

export const NEW_INVOICES_STEPS_ORDER: NewInvoiceFormStep[] = [
  NewInvoiceFormStep.amount,
  NewInvoiceFormStep.reference,
  NewInvoiceFormStep.notifications,
  NewInvoiceFormStep.currency,
  NewInvoiceFormStep.create,
];

export const newInvoiceFormReducer = (
  state: NewInvoiceFormState = initialState,
  action: NewInvoiceFormActions,
): NewInvoiceFormState => {
  switch (action.type) {
    case NEW_INVOICE_NEXT_STEP:
      return newInvoiceNextStep(state);
    case NEW_INVOICE_UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case NEW_INVOICE_GOTO_STEP:
      return {
        ...state,
        step: action.payload,
      };
    default:
      return state;
  }
};

export const newInvoiceNextStep = (
  state: NewInvoiceFormState,
): NewInvoiceFormState => {
  const currentIndex = NEW_INVOICES_STEPS_ORDER.indexOf(state.step);
  if (currentIndex < 0) {
    return state;
  }
  const nextIndex = currentIndex + 1;
  if (nextIndex >= NEW_INVOICES_STEPS_ORDER.length) {
    return state;
  }
  return {
    ...state,
    step: NEW_INVOICES_STEPS_ORDER[nextIndex],
  };
};
