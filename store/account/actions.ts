import { createAction } from '@reduxjs/toolkit';

import { CHANGE_NETWORK_TYPE } from './types';

export const changeNetworkType = createAction<
  string,
  typeof CHANGE_NETWORK_TYPE
>(CHANGE_NETWORK_TYPE);

export type AccountActionType = ReturnType<typeof changeNetworkType>;
