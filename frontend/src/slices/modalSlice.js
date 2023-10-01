/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, current } from '@reduxjs/toolkit';

const initialState = { type: null, item: null };

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    hideModal: (state) => {
      state.type = null;
      state.item = null;
    },
    showModal: (state, action) => {
      state.type = action.payload.type;
      state.item = action.payload.item || null;
    },
  },
});

export const { hideModal, showModal } = modalSlice.actions;

export default modalSlice.reducer;
