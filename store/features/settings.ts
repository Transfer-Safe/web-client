import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chain } from 'wagmi';

export interface SettingsState {
  chainId: number;
}

const initialState: SettingsState = {
  chainId: chain.polygonMumbai.id,
};

const settings = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeChain(state, action: PayloadAction<number>) {
      state.chainId = action.payload;
    },
  },
});

export const { changeChain } = settings.actions;

export default settings.reducer;
