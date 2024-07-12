import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Language from '@mui/icons-material/Language';
import Person from '@mui/icons-material/Person';
import GlobalSearchModal from './GlobalSearchModal';
import SearchIcon from '@mui/icons-material/Search';
import { SongSearchModalProps } from '#/types/song.types';
import axios from 'axios';
import { SetlistSearchModalProps } from '#/types/setlist.types';

interface SidebarProps {
  isOpen: boolean;
}

const drawerWidth = 100;

const SideBar: FC<SidebarProps> = ({ isOpen }): ReactElement => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const isDesktop = useMediaQuery('(min-width: 769px)');

  const [allSongs, setAllSongs] = useState<SongSearchModalProps[]>([]);
  const [allSetlists, setAllSetlists] = useState<SetlistSearchModalProps[]>([]);

  const getAllSongs = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/songs/get');
      if (status === 200) {
        setAllSongs(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllSongs();
  }, [getAllSongs]);

  const getAllSetlists = useCallback(async () => {
    try {
      const setlistRes = await axios.get('/api/setlists/get');
      if (setlistRes.status === 200) {
        setAllSetlists(setlistRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllSetlists();
  }, [getAllSetlists]);

  // Separate the "Profile" item from the rest of the items
  const topMenuItems = [
    { icon: <Language />, text: 'Home', path: '' },
    { icon: <MusicNoteIcon />, text: 'Songs', path: 'song' },
    { icon: <QueueMusicIcon />, text: 'Setlists', path: 'setlist' },
    { icon: <TextSnippetIcon />, text: 'Resources', path: 'resource' },
  ];

  const profileMenuItem = { icon: <Person />, text: 'Profile', path: 'profile' };

  const handleClick = (text: string, path: string) => {
    setSelectedItem(text);
    navigate(`/${path}`);
  };

  const handleSearchClick = () => {
    setSelectedItem('Search');
    onSearchOpen();
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const onSearchClose = () => setIsSearchOpen(false);
  const onSearchOpen = () => setIsSearchOpen(true);

  return (
    <>
      <Box sx={{ display: 'flex', minHeight: '100%' }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              ...(isDesktop && { position: 'relative' }),
              backgroundColor: 'primary.darkest',
            },
            minHeight: '100%',
          }}
          variant={isDesktop ? 'permanent' : 'temporary'}
          open={isDesktop || isOpen}
          anchor="left"
        >
          {/* Global Search Button */}
          <Box
            sx={{
              display: 'flex',
              flexDir: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: '1rem',
              mb: '0.2rem',
            }}
          >
            <Box
              onClick={() => handleSearchClick()}
              sx={{
                color: 'primary.lighter',
                backgroundColor: '#1D192B',
                borderRadius: '15px',
                padding: '1rem',
                width: 'fit-content',
                display: 'flex',
                flexDir: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              <SearchIcon sx={{ color: '#D0BCFE', width: '1.75rem', height: '1.75rem' }} />
            </Box>
          </Box>
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              flex: '1',
            }}
          >
            {/* Render the top menu items */}
            {topMenuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  selected={selectedItem === item.text}
                  onClick={() => handleClick(item.text, item.path)}
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 1,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: 'primary.lighter',
                      backgroundColor: selectedItem === item.text ? 'primary.main' : '',
                      borderRadius: '100px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingY: '5px',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primaryTypographyProps={{
                      sx: { color: 'primary.lighter' },
                      variant: 'subtitle2',
                      fontWeight: 700,
                    }}
                    primary={item.text}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedItem === profileMenuItem.text}
                onClick={() => handleClick(profileMenuItem.text, profileMenuItem.path)}
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'primary.lighter',
                    backgroundColor: selectedItem === profileMenuItem.text ? 'primary.main' : '',
                    borderRadius: '100px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingY: '5px',
                  }}
                >
                  {profileMenuItem.icon}
                </ListItemIcon>

                <ListItemText
                  primaryTypographyProps={{
                    sx: { color: 'primary.lighter' },
                    variant: 'subtitle2',
                    fontWeight: 700,
                  }}
                  primary={profileMenuItem.text}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={onSearchClose}
        allSongs={allSongs}
        allSetlists={allSetlists}
      />
    </>
  );
};

export default SideBar;
