import { AccountActionType } from './actions';
import { AccountState, CHANGE_NETWORK_TYPE } from './types';

const initialState: AccountState = {
  networkType: '',
};

export const accountReducer = (
  state: AccountState = initialState,
  action: AccountActionType,
): AccountState => {
  switch (action.type) {
    case CHANGE_NETWORK_TYPE:
      return state;
    default:
      return state;
  }
};
