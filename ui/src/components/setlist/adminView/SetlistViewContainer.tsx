import { Setlist } from '#/types/setlist.types';
import { Container, Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SongsTable from './SongsTable';

const SetlistViewContainer: FC = (): ReactElement | null => {
  const { id } = useParams();

  const [setlist, setSetlist] = useState<Setlist>();

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

  useEffect(() => {
    getSetlist();
  }, [getSetlist, id]);

  const date = setlist ? new Date(setlist.date).toISOString().split('T')[0] : '';
  return id && setlist ? (
    <Container maxWidth="lg">
      {/* Header */}
      <Box>
        <Typography>{setlist.name}</Typography>
        <Typography>Created on {date}</Typography>
      </Box>
      {/* Setlist button */}
      <Box>
        <Button>Edit Setlist</Button>
        <Button>Copy Link</Button>
        <Button>View in Browser</Button>
      </Box>
      {/* Songs Table */}
      <Box>
        <SongsTable songs={setlist.songs} />
      </Box>
    </Container>
  ) : null;
};

export default SetlistViewContainer;
