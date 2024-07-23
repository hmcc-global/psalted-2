import { createSlice } from '@reduxjs/toolkit';

export const setlistSlice = createSlice({
  name: 'setlists',
  initialState: {
    
  },
  reducers: {
    fetchSetlists: (_, action) => {
      return action.payload;
    },

  },
});

export const { fetchSetlists } = setlistSlice.actions;

export default setlistSlice.reducer;
