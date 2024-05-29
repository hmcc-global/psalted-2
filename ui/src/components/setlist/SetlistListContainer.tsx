import { Add, QueueMusic } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import axios from 'axios';
import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const SetlistTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const SetlistListContainer: FC = (): ReactElement => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [allSetlists, setAllSetlists] = useState([]);
  const [personalSetlists, setPersonalSetlists] = useState([]);
  const [sharedSetlists, setSharedSetlists] = useState([]);

  const getSetlists = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/setlists/get');
      if (status === 200) {
        setAllSetlists(data);

        // TODO: Set data for personal and shared setlists
        // setPersonalSetlists();
        // setSharedSetlists();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSetlists();
  }, [getSetlists]);

  return (
    <Container style={{ paddingTop: '5em', width: '100%', height: '100%' }}>
      {/* Toolbar at the top */}
      <Stack
        direction="row"
        display="flex"
        justifyContent="space-between"
        pb="10px"
        pl={{ base: '0', md: '15px' }}
      >
        {/* Title */}
        <Typography variant="h1" color="white" sx={{ display: 'flex', alignItems: 'center' }}>
          <QueueMusic
            sx={{
              color: 'primary.light',
              backgroundColor: 'primary.dark',
              borderRadius: '50%',
              width: '2em',
              height: '2em',
              padding: '0.5em',
              mr: 3,
            }}
          />
          Setlists
        </Typography>

        {/* Add new setlist button */}
        <Button
          variant="outlined"
          sx={{
            borderWidth: '2px',
            padding: '10px 25px',
            borderRadius: '40px',
            backgroundColor: 'rgba(208, 188, 255, 0.12)',
            color: '#D0BCFF',
            textTransform: 'none',
          }}
          startIcon={<Add />}
          onClick={() => navigate('/setlist/add')}
        >
          <Typography variant="subtitle1">New Setlist</Typography>
        </Button>
      </Stack>

      <Box>
        <Stack direction={'row'}>
          <Tabs selectionFollowsFocus value={tab} onChange={(e, newValue) => setTab(newValue)}>
            <Tab label="All"></Tab>
            <Tab label="Personal"></Tab>
            <Tab label="Shared"></Tab>
          </Tabs>

          <Divider />

          {/* TODO: Display individual setlist */}
          <Box></Box>
        </Stack>

        <SetlistTabPanel value={tab} index={0}>
          {allSetlists.length > 0 ? (
            allSetlists.map((setlist, i) => <Box></Box>)
          ) : (
            <Box>
              <Typography variant="subtitle1" color="primary.main">
                No Setlists Found
              </Typography>
            </Box>
          )}
        </SetlistTabPanel>

        <SetlistTabPanel value={tab} index={1}>
          {personalSetlists.length > 0 ? (
            personalSetlists.map((setlist, i) => <Box></Box>)
          ) : (
            <Box>
              <Typography variant="subtitle1" color="primary.main">
                No Personal Setlists Found
              </Typography>
            </Box>
          )}
        </SetlistTabPanel>

        <SetlistTabPanel value={tab} index={2}>
          {sharedSetlists.length > 0 ? (
            sharedSetlists.map((setlist, i) => <Box></Box>)
          ) : (
            <Box>
              <Typography variant="subtitle1" color="primary.main">
                No Shared Setlists Found
              </Typography>
            </Box>
          )}
        </SetlistTabPanel>
      </Box>
    </Container>
  );
};

export default SetlistListContainer;
