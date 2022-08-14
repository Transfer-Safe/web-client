import {
  ConfirmInvoiceAction,
  FAILED_CONFIRM_INVOICE,
  RESET_CONFIRM_INVOICE,
  SIGNED_CONFIRM_INVOICE,
  START_CONFIRM_INVOICE,
  SUCCESS_CONFIRM_INVOICE,
} from './actions';
import { ConfirmInvoiceState, ConfirmInvoiceStatus } from './types';

const initialState: ConfirmInvoiceState = {
  status: ConfirmInvoiceStatus.IDLE,
  error: null,
};

export const confirmInvoiceReducer = (
  state = initialState,
  action: ConfirmInvoiceAction,
): ConfirmInvoiceState => {
  switch (action.type) {
    case START_CONFIRM_INVOICE:
      return {
        ...state,
        error: null,
        status: ConfirmInvoiceStatus.SIGNING,
      };
    case SIGNED_CONFIRM_INVOICE:
      return {
        ...state,
        txid: action.payload.txid,
        status: ConfirmInvoiceStatus.CONFIRMING,
      };
    case SUCCESS_CONFIRM_INVOICE:
      return {
        ...state,
        status: ConfirmInvoiceStatus.SUCCESS,
      };
    case FAILED_CONFIRM_INVOICE:
      return {
        ...state,
        error: action.payload?.message ?? null,
      };
    case RESET_CONFIRM_INVOICE:
      return initialState;
    default:
      return state;
  }
};
