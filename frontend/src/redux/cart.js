import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existingIndex = state.findIndex((x) => x.id === item.id);
      if (existingIndex !== -1) {
        if (state.at(existingIndex).id === item.id) {
          state.at(existingIndex).quantity += 1;
        }
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },
    deleteItem(state, action) {
      const item = action.payload;
      const existingIndex = state.findIndex((x) => x.id === item.id);
      if (existingIndex !== undefined) {
        if (state.at(existingIndex).quantity !== 1) {
          if (state.at(existingIndex).id === item.id) {
            state.at(existingIndex).quantity -= 1;
          }
        } else {
          state.splice(existingIndex, 1);
        }
      }
    },
  },
});

export default cartSlice.reducer;
export const { addItem, deleteItem } = cartSlice.actions;
