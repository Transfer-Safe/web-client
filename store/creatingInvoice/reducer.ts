import { CreateInvoiceActions, CREATE_INVOICE } from './actions';
import { CreatingInvoiceState } from './types';

const initialState: CreatingInvoiceState = {};

export const creatingInvoiceReducer = (
  state: CreatingInvoiceState = initialState,
  { type, payload }: CreateInvoiceActions,
): CreatingInvoiceState => {
  switch (type) {
    case CREATE_INVOICE:
      return {
        ...payload,
        ...state,
      };
    default:
      return state;
  }
};
