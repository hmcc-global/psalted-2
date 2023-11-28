import React, { FC, ReactElement, useState, useEffect } from 'react';
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
import HomeIcon from '@mui/icons-material/Home';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface SidebarProps {
  isOpen: boolean;
}

const drawerWidth = 240;

const SideBar: FC<SidebarProps> = ({ isOpen }): ReactElement => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const menuItems = [
    { icon: <HomeIcon />, text: 'Home' },
    { icon: <MusicNoteIcon />, text: 'Songs' },
    { icon: <QueueMusicIcon />, text: 'My Setlists' },
    { icon: <SupervisedUserCircleIcon />, text: 'Groups' },
    { icon: <TextSnippetIcon />, text: 'Resources' },
  ];

  const handleClick = (text: string) => {
    setSelectedItem(text);
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
          },
        }}
        // drawer only open in desktop/ clicked on mobile
        variant={isDesktop ? 'permanent' : 'temporary'}
        open={isDesktop || isOpen}
        anchor="left"
      >
        <List sx={{ marginTop: { xs: '4em', md: '0' } }}>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                ...(selectedItem === item.text && {
                  backgroundColor: 'primary.lighter',
                }),
              }}
            >
              <ListItemButton
                // highlight selected item
                selected={selectedItem === item.text}
                onClick={() => handleClick(item.text)}
              >
                <ListItemIcon sx={{ color: selectedItem === item.text ? 'primary.main' : '' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  // primaryTypographyProps is  the only way to change listItemText styling
                  primaryTypographyProps={{
                    sx: { color: selectedItem === item.text ? 'primary.main' : '' },
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