import { combineReducers } from 'redux';

import { accountReducer, AccountState } from './account';
import { confirmInvoiceReducer, ConfirmInvoiceState } from './confirmInvoice';
import {
  creatingInvoiceReducer,
  CreatingInvoiceState,
} from './creatingInvoice';
import { NewInvoiceFormState } from './newInvoiceForm';
import { newInvoiceFormReducer } from './newInvoiceForm/reducer';
import { settingsReducer } from './settings/reducer';
import { SettingsState } from './settings/types';
import { transferInvoiceReducer } from './transferInvoice/reducer';
import { TransferInvoiceState } from './transferInvoice/types';

export interface RootState {
  account: AccountState;
  settings: SettingsState;
  creatingInvoice: CreatingInvoiceState;
  newInvoiceForm: NewInvoiceFormState;
  transferInvoice: TransferInvoiceState;
  confirmInvoice: ConfirmInvoiceState;
}

export const rootReducer = combineReducers<RootState>({
  account: accountReducer,
  settings: settingsReducer,
  creatingInvoice: creatingInvoiceReducer,
  newInvoiceForm: newInvoiceFormReducer,
  transferInvoice: transferInvoiceReducer,
  confirmInvoice: confirmInvoiceReducer,
});
