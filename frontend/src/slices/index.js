import { configureStore } from '@reduxjs/toolkit';

import chatSlice from './chatSlice';
import socketMiddleware from './socketMidlware';
import Socket from '../socket';

export default configureStore({
  reducer: {
    chat: chatSlice,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(socketMiddleware(new Socket()))),
});
