import { Setlist } from '#/types/setlist.types';
import { Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
  console.log(setlist);
  return id && setlist ? (
    <Container maxWidth="lg">
      <Box>
        <Typography>{setlist.name}</Typography>
      </Box>
    </Container>
  ) : null;
};

export default SetlistViewContainer;
