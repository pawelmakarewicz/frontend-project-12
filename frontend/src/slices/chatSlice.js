/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const initialState = {
  appData: {
    channels: null,
    currentChannelIdL: null,
    messages: null,
  },
  socket: null,
  loadingStatus: null,
  error: null,
};
const USER_ID = 'userId';

export const initializeApp = createAsyncThunk(
  'chat/getAppData',
  async (_, thunkApi) => {
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
  reducers: {
    initSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.appData = action.payload;
        state.loadingStatus = 'loaded';
        state.error = null;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default catalogueSlice.reducer;
