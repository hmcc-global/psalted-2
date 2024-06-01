import { SetlistFolder } from '#/types/setlist.types';
import { KeyboardArrowDown, QueueMusic } from '@mui/icons-material';
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
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
} from '@mui/material';
import axios from 'axios';
import { FC, ReactElement, useState, useEffect, useCallback, Fragment, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import SetlistFolderDrawer from './SetlistFolderDrawer';

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const SetlistListContainer: FC = (): ReactElement => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();

  const [tab, setTab] = useState(0);
  const [allSetlists, setAllSetlists] = useState<SetlistFolder[]>([]);
  const [personalSetlists, setPersonalSetlists] = useState([]);
  const [setlistFolders, setSetlistFolders] = useState([]);

  // handle create setlist/folder button
  const [createAnchorEl, setCreateAnchorEl] = useState<null | HTMLElement>(null);
  const openCreate = Boolean(createAnchorEl);
  const handleCreateClick = (event: MouseEvent<HTMLElement>) => {
    setCreateAnchorEl(event.currentTarget);
  };
  const handleCreateClose = () => {
    setCreateAnchorEl(null);
  };

  // handle folder side pane drawer
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [folderId, setFolderId] = useState<string>('');
  const [folderName, setFolderName] = useState<string>('');
  const toggleFolderDrawer = (newOpen: boolean) => {
    setOpenDrawer(newOpen);
  };

  const getSetlists = useCallback(async () => {
    try {
      const { data, status } = await axios.get('http://localhost:1338/api/setlists/get');
      if (status === 200) {
        setAllSetlists(data);

        // TODO: Set data for personal and shared setlists
        // setPersonalSetlists();
        // setSetlistFolders();
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
            py: '10px',
            borderRadius: '40px',
            backgroundColor: 'secondary.main',
            color: '#primary.main',
            textTransform: 'none',
          }}
          endIcon={<KeyboardArrowDown />}
          onClick={handleCreateClick}
        >
          Create
        </Button>
        <Menu
          anchorEl={createAnchorEl}
          open={openCreate}
          onClose={handleCreateClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={() => navigate('/setlist/add')}>Create Setlist</MenuItem>
          <MenuItem onClick={() => toggleFolderDrawer(true)}>Create Folder</MenuItem>
        </Menu>
      </Stack>

      <Stack direction="row">
        {/* list out all existing setlists */}
        <Box width={'35%'}>
          <Tabs
            selectionFollowsFocus
            variant="fullWidth"
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
          >
            {/* TODO: Move this to theme to remove repeated code */}
            <Tab sx={{ textTransform: 'none' }} label="All"></Tab>
            <Tab sx={{ textTransform: 'none' }} label="Folders"></Tab>
            <Tab sx={{ textTransform: 'none' }} label="Setlists"></Tab>
          </Tabs>

          <Divider sx={{ borderColor: '#49454F' }} />

          <SetlistTabPanel value={tab} index={0}>
            <List>
              {allSetlists.length > 0 ? (
                allSetlists.map((setlist, i) => (
                  <Fragment key={i}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <QueueMusic sx={{ color: 'secondary.main' }} fontSize="large" />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography>{setlist.name}</Typography>
                          <Typography>{setlist.date.toString()}</Typography>
                        </ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <Divider sx={{ borderColor: '#49454F' }} />
                  </Fragment>
                ))
              ) : (
                <ListItem>
                  <Typography variant="subtitle1" color="primary.main">
                    No Setlists Found
                  </Typography>
                </ListItem>
              )}
            </List>
          </SetlistTabPanel>

          <SetlistTabPanel value={tab} index={1}>
            <List>
              {setlistFolders.length > 0 ? (
                setlistFolders.map((setlist, i) => <ListItem></ListItem>)
              ) : (
                <ListItem>
                  <Typography variant="subtitle1" color="primary.main">
                    No Folders Found
                  </Typography>
                </ListItem>
              )}
            </List>
          </SetlistTabPanel>

          <SetlistTabPanel value={tab} index={2}>
            <List>
              {personalSetlists.length > 0 ? (
                personalSetlists.map((setlist, i) => <ListItem></ListItem>)
              ) : (
                <ListItem>
                  <Typography variant="subtitle1" color="primary.main">
                    No Personal Setlists Found
                  </Typography>
                </ListItem>
              )}
            </List>
          </SetlistTabPanel>
        </Box>

        <Divider orientation="vertical" variant="fullWidth" sx={{ borderColor: '#D9D9D980' }} />

        {/* display setlist details & preview */}
        <Box></Box>
      </Stack>

      <SetlistFolderDrawer
        openDrawer={openDrawer}
        toggleFolderDrawer={toggleFolderDrawer}
        setFolderId={setFolderId}
        setFolderName={setFolderName}
        folderId={folderId}
        folderName={folderName}
      />
    </Container>
  );
};

export default SetlistListContainer;