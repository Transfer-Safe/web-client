import { combineReducers } from 'redux';

import { accountReducer, AccountState } from './account';
import {
  creatingInvoiceReducer,
  CreatingInvoiceState,
} from './creatingInvoice';
import { settingsReducer } from './settings/reducer';
import { SettingsState } from './settings/types';

export interface RootState {
  account: AccountState;
  settings: SettingsState;
  creatingInvoice: CreatingInvoiceState;
}

export const rootReducer = combineReducers<RootState>({
  account: accountReducer,
  settings: settingsReducer,
  creatingInvoice: creatingInvoiceReducer,
});
