import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const data = action.payload;
      // console.log(data);
      state.isAuthenticated = true;
      if (data.name) {
        state.name = data.name;
      }
    },
    unsetUser(state, action) {
      state.name = null;
      state.isAuthenticated = false;
    },
  },
});

export default userSlice.reducer;
export const { setUser, unsetUser } = userSlice.actions;
