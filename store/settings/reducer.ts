import { chain } from 'wagmi';

import { CHANGE_CHAIN, SettingsActions } from './actions';
import { SettingsState } from './types';

const initialState: SettingsState = {
  chainId: chain.polygonMumbai.id,
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
