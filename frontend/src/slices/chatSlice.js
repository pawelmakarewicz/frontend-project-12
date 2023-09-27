/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

function transformArrayToObject(arr) {
  const result = {};

  for (let i = 0; i < arr.length; i += 1) {
    const obj = arr[i];
    const {
      channelId, body, username, id,
    } = obj;

    if (!result[channelId]) {
      result[channelId] = [];
    }

    result[channelId].push({ body, username, id });
  }

  return result;
}

const initialState = {
  appData: {
    channels: null,
    currentChannelId: null,
    messages: null,
    currentMessage: '',
  },
  loadingStatus: null,
  error: null,
};
const USER_ID = 'userId';

export const initializeApp = createAsyncThunk(
  'chat/getAppData',
  async () => {
    const { token } = JSON.parse(localStorage.getItem(USER_ID));
    const authorization = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(routes.usersPath(), { headers: authorization });
    return response.data;
  },
);

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setCurrentMessage: (state, action) => {
      state.appData.currentMessage = action.payload;
    },
    updateAppDataAfterSendingMessage: (state) => {
      state.appData.currentMessage = '';
    },
    updateAppDataMessages: (state, action) => {
      console.log('action.payload', action.payload);
      const { channelId, body, username } = action.payload;
      state.appData.messages[channelId].push({ body, username });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        const { messages, currentChannelId, channels } = action.payload;
        state.appData = {
          ...state.appData, currentChannelId, channels, messages: transformArrayToObject(messages),
        };
        state.loadingStatus = 'loaded';
        state.error = null;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const {
  setCurrentMessage,
  updateAppDataMessages,
  updateAppDataAfterSendingMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
