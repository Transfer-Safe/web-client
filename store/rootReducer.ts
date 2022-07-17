import { combineReducers } from 'redux';
import { accountReducer, AccountState } from './account';

export interface RootState {
  account: AccountState;
}

export const rootReducer = combineReducers<RootState>({
  account: accountReducer,
});
