import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '../../models';
import { encryptEmailClient } from '../../utils';
import { RootState } from '../rootReducer';

export interface EncryptEmailState {
  status: LoadingStatus;
  encryptedEmail?: string;
  error?: string;
}

const initialState: EncryptEmailState = {
  status: LoadingStatus.Idle,
};

export const selectEncryptedEmail = (state: RootState) =>
  state.encryptEmail.encryptedEmail;

export const selectIsEncryptingEmail = (state: RootState) =>
  state.encryptEmail.status === LoadingStatus.Loading;

export const selectEmailEncryptingError = (state: RootState) =>
  state.encryptEmail.error;

export const encryptEmail = createAsyncThunk(
  'email/encrypt',
  async (email: string) => {
    const encryptedEmail = await encryptEmailClient(email);
    return encryptedEmail;
  },
);

const encryptEmailSlice = createSlice({
  name: 'encryptEmail',
  reducers: {
    resetEmailEncryption: () => initialState,
  },
  initialState,
  extraReducers(builder) {
    builder.addCase(encryptEmail.pending, (state) => {
      state.status = LoadingStatus.Loading;
      state.error = undefined;
      state.encryptedEmail = undefined;
    });
    builder.addCase(encryptEmail.fulfilled, (state, action) => {
      state.status = LoadingStatus.Success;
      state.encryptedEmail = action.payload;
    });
    builder.addCase(encryptEmail.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = LoadingStatus.Error;
    });
  },
});

export const { resetEmailEncryption } = encryptEmailSlice.actions;
export default encryptEmailSlice.reducer;
