import { SetlistFolder, SetlistFolderMember } from '#/types/setlist.types';
import {
  Add,
  Check,
  Close,
  Delete,
  Folder,
  GroupAdd,
  KeyboardArrowDown,
  QueueMusic,
} from '@mui/icons-material';
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
  Drawer,
  TextField,
  InputBase,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  AlertTitle,
  Fade,
  Snackbar,
} from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { FC, ReactElement, useState, useEffect, useCallback, Fragment, MouseEvent } from 'react';
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
  const toggleFolderDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  // handle add people modal
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [allPeople, setAllPeople] = useState<SetlistFolderMember[]>([]);
  const [addedPeople, setAddedPeople] = useState<string[]>([]);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // handle snackbar and error in folder handling
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState<boolean>(false);
  const [invalidFolder, setInvalidFolder] = useState<string>('');

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

  const getPeople = useCallback(async () => {
    try {
      const { data, status } = await axios.get('http://localhost:1338/api/users/get');
      if (status === 200) setAllPeople(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSetlists();
    getPeople();
  }, [getSetlists, getPeople]);

  // To render the songs that are added to setlist
  const addedPeopleList = allPeople.filter((person) => addedPeople.includes(person._id));
  const handleAddPerson = (id: string) => {
    let result = addedPeople.includes(id)
      ? addedPeople.filter((add) => add != id)
      : [...addedPeople, id];
    setAddedPeople(result);
  };

  const handleSaveFolder = async () => {
    try {
      let payload: AxiosResponse;
      if (folderId) {
        payload = await axios.put('http://localhost:1338/api/groups/update', {
          id: folderId,
          groupName: folderName,
          userIds: addedPeople,
        });
      } else {
        payload = await axios.post('http://localhost:1338/api/groups/create', {
          groupName: folderName,
          userIds: addedPeople,
        });
      }

      if (payload.status === 200) {
        handleCloseModal();
        setInvalidFolder('');
        setSuccessSnackbarOpen(true);
        return payload.data;
      }

      setInvalidFolder('Error saving setlist');
      setSuccessSnackbarOpen(false);
    } catch (error: any) {
      setInvalidFolder(error.response.data);
      setSuccessSnackbarOpen(false);
      console.log(error);
    }
  };

  const handleCloseSuccessSnackbar = () => {
    setSuccessSnackbarOpen(false);
  };

  return (
    <Container style={{ paddingTop: '5em', width: '100%', height: '100%' }}>
      {/* Error message */}
      {invalidFolder ? (
        <Typography variant={'body2'} color={'error'}>
          {invalidFolder}
        </Typography>
      ) : null}

      {/* Success message */}
      <Snackbar
        open={successSnackbarOpen}
        onClose={handleCloseSuccessSnackbar}
        autoHideDuration={6000}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={handleCloseSuccessSnackbar}>
          <AlertTitle>Success</AlertTitle>
          Folder successfully saved!
        </Alert>
      </Snackbar>

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
          <MenuItem onClick={toggleFolderDrawer(true)}>Create Folder</MenuItem>
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

      {/* Folder settings */}
      <Drawer
        anchor={'right'}
        open={openDrawer}
        onClose={toggleFolderDrawer(false)}
        PaperProps={{
          sx: { width: '25%' },
        }}
      >
        <Box>
          <Stack direction="row" spacing={1} padding={2}>
            <Folder sx={{ color: 'primary.light' }} />
            <Typography variant="h4">Folder Info</Typography>
          </Stack>

          <Divider sx={{ borderColor: '#49454F' }} />

          {/* folder name field */}
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">Folder Name</Typography>
            <TextField fullWidth id="folderName" onChange={(e) => setFolderName(e.target.value)} />
          </Box>

          <Divider sx={{ borderColor: '#49454F' }} />

          {/* folder members list */}
          <Box sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h3" sx={{ color: 'secondary.main' }}>
                Members
              </Typography>
              <Button
                startIcon={<GroupAdd />}
                onClick={handleOpenModal}
                sx={{ color: 'primary.light' }}
              >
                Add people
              </Button>
            </Stack>

            <List>
              {addedPeopleList.length > 0 ? (
                addedPeopleList.map((person, i) => (
                  <ListItem
                    key={i}
                    secondaryAction={
                      <IconButton edge="end">
                        <Delete sx={{ color: '#EFB8C8' }} />
                      </IconButton>
                    }
                  >
                    <Stack direction="column">
                      <Typography variant="subtitle1">{person.fullName}</Typography>
                      <Typography variant="body2">{person.email}</Typography>
                    </Stack>
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <Typography variant="subtitle1" color="primary.lighter">
                    No members added
                  </Typography>
                </ListItem>
              )}
            </List>
          </Box>

          {/* save and cancel button for drawer */}
          <Box sx={{ position: 'absolute', bottom: 12, width: '100%' }}>
            <Stack direction="row" spacing={2} px={2} width={'100%'}>
              <Button
                sx={{
                  width: '50%',
                  backgroundColor: 'secondary.main',
                  color: 'primary.main',
                  borderRadius: '40px',
                  textTransform: 'none',
                }}
                onClick={() => handleSaveFolder()}
              >
                Save
              </Button>
              <Button
                sx={{
                  width: '50%',
                  backgroundColor: 'primary.dark',
                  color: 'secondary.light',
                  borderRadius: '40px',
                  textTransform: 'none',
                }}
                onClick={toggleFolderDrawer(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Box>
      </Drawer>

      {/* Add people modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{ sx: { width: '30rem', height: '30rem' } }}
      >
        <DialogTitle>
          <Stack direction="row" spacing={1} alignItems="center">
            <GroupAdd sx={{ color: 'primary.light' }} />
            <Typography variant="h3">Add People</Typography>
          </Stack>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <InputBase
          placeholder="Search name or email"
          sx={{
            alignSelf: 'center',
            width: '90%',
            py: 1,
            px: 2,
            color: 'secondary.light',
            backgroundColor: 'secondary.lighter',
            borderRadius: '28px',
          }}
        />
        <DialogContent sx={{ pt: 0 }}>
          <List>
            {allPeople.length > 0 ? (
              allPeople.map((person, i) => (
                <ListItem
                  key={i}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleAddPerson(person._id)}
                      sx={{
                        width: '30px',
                        height: '30px',
                        border: 1,
                        borderRadius: '50%',
                        borderWidth: '2px',
                        color: 'primary.lighter',
                        '&:hover': { color: 'secondary.main' },
                        '&.Mui-selected': {
                          backgroundColor: 'secondary.main',
                          color: 'primary.darkest',
                        },
                      }}
                      className={addedPeople.includes(person._id) ? 'Mui-selected' : ''}
                    >
                      {addedPeople.includes(person._id) ? <Check /> : <Add />}
                    </IconButton>
                  }
                >
                  <Stack direction="column">
                    <Typography variant="subtitle1">{person.fullName}</Typography>
                    <Typography variant="body2">{person.email}</Typography>
                  </Stack>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Typography variant="subtitle1" color="primary.lighter">
                  No users exist or failed retrieving users
                </Typography>
              </ListItem>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default SetlistListContainer;
