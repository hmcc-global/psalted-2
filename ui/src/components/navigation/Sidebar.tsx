import { FC, ReactElement, useState } from 'react';
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
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Language from '@mui/icons-material/Language';

interface SidebarProps {
  isOpen: boolean;
}

const drawerWidth = 100;

const SideBar: FC<SidebarProps> = ({ isOpen }): ReactElement => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const menuItems = [
    { icon: <Language />, text: 'Home', path: '' },
    { icon: <MusicNoteIcon />, text: 'Songs', path: 'song' },
    { icon: <QueueMusicIcon />, text: 'Setlists', path: 'setlist' },
    { icon: <SupervisedUserCircleIcon />, text: 'Groups', path: 'group' },
    { icon: <TextSnippetIcon />, text: 'Resources', path: 'resource' },
  ];

  const handleClick = (text: string, path: string) => {
    setSelectedItem(text);
    navigate(`/${path}`);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
        }}
        // drawer only open in desktop/ clicked on mobile
        variant={isDesktop ? 'permanent' : 'temporary'}
        open={isDesktop || isOpen}
        anchor="left"
      >
        <List sx={{ marginTop: { xs: '4em', md: '0' } }}>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                // highlight selected item
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
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  // primaryTypographyProps is the only way to change listItemText styling
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
      </Drawer>
    </Box>
  );
};

export default SideBar;
