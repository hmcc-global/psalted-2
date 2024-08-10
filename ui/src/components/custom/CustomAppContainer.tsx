import { getFoldersGlobal, getSetlistsGlobal, getSongsGlobal } from '../../helpers/global';
import { Box } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  children: ReactNode;
};
const CustomAppContainer = ({ children }: Props) => {
  const dispatch = useDispatch();
  // Get songs, setlists, folders globally
  // TO-DO: Now its called on every re render, cache it and check if there is change then call.
  useEffect(() => {
    getSongsGlobal(dispatch);
    getSetlistsGlobal(dispatch);
    getFoldersGlobal(dispatch);
  }, [dispatch]);
  return (
    <Box display="flex" flexDirection="row" height="100vh">
      {children}
    </Box>
  );
};

export default CustomAppContainer;
