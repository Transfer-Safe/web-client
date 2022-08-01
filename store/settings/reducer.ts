import { Mumbai } from '@usedapp/core';

import { CHANGE_CHAIN, SettingsActions } from './actions';
import { SettingsState } from './types';

const initialState: SettingsState = {
  chainId: Mumbai.chainId,
};

export const settingsReducer = (
  state: SettingsState = initialState,
  action: SettingsActions,
): SettingsState => {
  switch (action.type) {
    case CHANGE_CHAIN:
      return {
        ...state,
        chainId: action.payload,
      };
    default:
      return state;
  }
};
