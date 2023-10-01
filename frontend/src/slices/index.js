import { configureStore } from '@reduxjs/toolkit';

import chatReducer from './chatSlice';
import modalReducer from './modalSlice';
import socketMiddleware from './socketMidlware';
import Socket from '../socket';

export default configureStore({
  reducer: {
    chat: chatReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(socketMiddleware(new Socket()))),
});
