import { createAction } from '@reduxjs/toolkit';
import { Chain } from '@usedapp/core';

export const CHANGE_CHAIN = 'CHANGE_CHAIN';

export const changeChain = createAction<Chain, typeof CHANGE_CHAIN>(
  CHANGE_CHAIN,
);
