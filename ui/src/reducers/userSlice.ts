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
    refetchUser: (_, action) => {
      return action.payload;
    },
  },
});

export const { signin, signout, refetchUser } = userSlice.actions;

export default userSlice.reducer;
