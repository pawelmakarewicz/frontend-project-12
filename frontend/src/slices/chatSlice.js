/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const initialState = {
  channels: null,
  currentChannelIdL: null,
  messages: null,
  loadingStatus: null,
  error: null,
};
const USER_ID = 'userId';

export const getCatalogues = createAsyncThunk(
  'chanels/getChanels',
  async () => {
    const { token } = JSON.parse(localStorage.getItem(USER_ID));
    const authorization = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(routes.usersPath(), { headers: authorization });
    return response.data;
  },
);

const catalogueSlice = createSlice({
  name: 'chatSlice',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCatalogues.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getCatalogues.fulfilled, (state, action) => {
        const { channels, currentChannelId, messages } = action.payload;
        state.channels = channels;
        state.currentChannelId = currentChannelId;
        state.messages = messages;
        state.loadingStatus = 'loaded';
        state.error = null;
      })
      .addCase(getCatalogues.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default catalogueSlice.reducer;
