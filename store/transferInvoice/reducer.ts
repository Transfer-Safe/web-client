import {
  FAILED_TRANSFER_INVOICE,
  RESET_TRANSFER_INVOICE,
  SIGNED_TRANSFER_INVOICE,
  START_TRANSFER_INVOICE,
  SUCCESS_TRANSFER_INVOICE,
  TransferInvoiceActions,
} from './actions';
import { TransferInvoiceState, TransferInvoiceStatus } from './types';

const initialState: TransferInvoiceState = {
  status: TransferInvoiceStatus.IDLE,
  transferError: null,
};

export const transferInvoiceReducer = (
  state: TransferInvoiceState = initialState,
  action: TransferInvoiceActions,
): TransferInvoiceState => {
  switch (action.type) {
    case START_TRANSFER_INVOICE:
      return {
        ...state,
        status: TransferInvoiceStatus.SIGNING,
        transferError: null,
        transferType: action.payload,
      };
    case SIGNED_TRANSFER_INVOICE:
      return {
        ...state,
        txId: action.payload.txId,
        status: TransferInvoiceStatus.TRANSFERRING,
      };
    case SUCCESS_TRANSFER_INVOICE:
      return {
        ...state,
        status: TransferInvoiceStatus.SUCCESS,
        transferError: null,
      };
    case FAILED_TRANSFER_INVOICE:
      return {
        ...state,
        status: TransferInvoiceStatus.ERROR,
        transferError: action.payload?.message || null,
      };
    case RESET_TRANSFER_INVOICE:
      return initialState;
    default:
      return state;
  }
};
