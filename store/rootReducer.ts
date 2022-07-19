import { combineReducers } from 'redux';

import { accountReducer, AccountState } from './account';
import { settingsReducer } from './settings/reducer';
import { SettingsState } from './settings/types';

export interface RootState {
  account: AccountState;
  settings: SettingsState;
}

export const rootReducer = combineReducers<RootState>({
  account: accountReducer,
  settings: settingsReducer,
});
