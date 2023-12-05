import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload;
      const existing = state.findIndex((x) => x.id === item.id);
      if (existing != undefined) {
        state.at(existing).quantity += 1;
      } else {
        state.push({ ...item, quantity: 1 });
      }
    },
    deleteItem(state, action) {
      const item = action.payload;
      const existingIndex = state.findIndex((x) => x.id === item.id);
      if (existingIndex !== undefined) {
        if (state.at(existingIndex).quantity !== 1) {
          state.at(existingIndex).quantity -= 1;
        } else {
          state.splice(existingIndex, 1);
        }
      }
    },
  },
});

export default cartSlice.reducer;
