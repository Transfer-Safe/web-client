import { combineReducers } from 'redux';

import { accountReducer, AccountState } from './account';
import {
  creatingInvoiceReducer,
  CreatingInvoiceState,
} from './creatingInvoice';
import { NewInvoiceFormState } from './newInvoiceForm';
import { newInvoiceFormReducer } from './newInvoiceForm/reducer';
import { settingsReducer } from './settings/reducer';
import { SettingsState } from './settings/types';

export interface RootState {
  account: AccountState;
  settings: SettingsState;
  creatingInvoice: CreatingInvoiceState;
  newInvoiceForm: NewInvoiceFormState;
}

export const rootReducer = combineReducers<RootState>({
  account: accountReducer,
  settings: settingsReducer,
  creatingInvoice: creatingInvoiceReducer,
  newInvoiceForm: newInvoiceFormReducer,
});
