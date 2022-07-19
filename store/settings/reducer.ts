import { Mumbai } from '@usedapp/core';

import { SettingsState } from './types';

const initialState: SettingsState = {
  chain: Mumbai,
};

export const settingsReducer = (
  state: SettingsState = initialState,
): SettingsState => {
  return state;
};
