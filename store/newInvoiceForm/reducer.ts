import { NewInvoiceFormActions } from './actions';
import { NewInvoiceFormState, NewInvoiceFormStep } from './types';

export const initialState: NewInvoiceFormState = {
  step: NewInvoiceFormStep.amount,
};

const STEPS_ORDER: NewInvoiceFormStep[] = [
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
    case 'NEW_INVOICE_NEXT_STEP':
      return newInvoiceNextStep(state);
    default:
      return state;
  }
};

export const newInvoiceNextStep = (
  state: NewInvoiceFormState,
): NewInvoiceFormState => {
  const currentIndex = STEPS_ORDER.indexOf(state.step);
  if (currentIndex < 0) {
    return state;
  }
  const nextIndex = currentIndex + 1;
  if (nextIndex >= STEPS_ORDER.length) {
    return state;
  }
  return {
    ...state,
    step: STEPS_ORDER[nextIndex],
  };
};
