import { createSlice } from '@reduxjs/toolkit';

export const songSlice = createSlice({
  name: 'songs',
  initialState: {
    
  },
  reducers: {
    fetchSongs: (_, action) => {
      return action.payload;
    },

  },
});

export const { fetchSongs } = songSlice.actions;

export default songSlice.reducer;
