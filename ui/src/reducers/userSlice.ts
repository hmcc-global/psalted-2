import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    signin: (_, action) => {
      return action.payload;
    },
    signout: (_, _action) => {
      return {};
    },
  },
});

export const { signin, signout } = userSlice.actions;

export default userSlice.reducer;
