import { Setlist } from '#/types/setlist.types';
import { Container, Box, Typography, Button, styled, Snackbar, IconButton } from '@mui/material';
import axios from 'axios';
import { FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SongsTable from './SongsTable';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import SetlistPreview from './SetlistPreview';

const SetlistButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  color: theme.palette.primary.light,
  borderColor: theme.palette.primary.light,
  padding: '8px 24px',
}));

const SetlistViewContainer: FC = (): ReactElement | null => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [setlist, setSetlist] = useState<Setlist>();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const date = useMemo(() => {
    // return setlist ? new Date(setlist.date).toISOString().split('T')[0] : '';
    return setlist?.date;
  }, [setlist]);

  const getSetlist = useCallback(async () => {
    try {
      const { data, status } = await axios.get(`/api/setlists/get`, {
        params: {
          id: id,
        },
      });
      if (status === 200) {
        setSetlist(data);
      }
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const handleEdit = () => {
    navigate(`/setlist/edit/${id}`);
  };

  const handleCopy = () => {
    setOpenSnackbar(true);
    if (setlist?.publicLink) {
      navigator.clipboard.writeText(setlist?.publicLink ?? '');
      setSnackbarMessage('Link copied to clipboard');
    } else {
      setSnackbarMessage('No public link available');
    }
  };

  const handleLaunch = () => {
    navigate(`/setlist/view/${id}`);
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    getSetlist();
  }, [getSetlist, id]);

  return id && setlist ? (
    <Container
      maxWidth="lg"
      style={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '100%' }}
    >
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '50%' }}>
        {/* Header */}
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography variant="h1">{setlist.name}</Typography>
          <Typography variant="body1">Created on </Typography>
        </Box>
        {/* Setlist button */}
        <Box gap="8px" display="flex">
          <SetlistButton startIcon={<EditIcon />} variant="outlined" onClick={handleEdit}>
            Edit Setlist
          </SetlistButton>
          <SetlistButton startIcon={<LinkIcon />} variant="outlined" onClick={handleCopy}>
            Copy Link
          </SetlistButton>
          <SetlistButton startIcon={<LaunchIcon />} variant="outlined" onClick={handleLaunch}>
            View in Browser
          </SetlistButton>
        </Box>
        {/* Songs Table */}
        <Box>
          <SongsTable songs={setlist.songs} />
        </Box>
      </Box>
      {/* Lyrics Preview */}
      <Box width="50%">
        <SetlistPreview />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  ) : null;
};

export default SetlistViewContainer;
