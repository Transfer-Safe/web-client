import { createAction } from '@reduxjs/toolkit';

export const CHANGE_CHAIN = 'CHANGE_CHAIN';

export const changeChain = createAction<number, typeof CHANGE_CHAIN>(
  CHANGE_CHAIN,
);

export type SettingsActions = ReturnType<typeof changeChain>;
