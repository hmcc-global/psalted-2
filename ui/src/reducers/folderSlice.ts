import { createSlice } from '@reduxjs/toolkit';

export const folderSlice = createSlice({
  name: 'folders',
  initialState: {
    
  },
  reducers: {
    fetchFolders: (_, action) => {
      return action.payload;
    },

  },
});

export const { fetchFolders } = folderSlice.actions;

export default folderSlice.reducer;
