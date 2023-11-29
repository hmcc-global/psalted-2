import React, { FC, ReactElement, useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface SidebarMobileProps {
  isOpen: boolean;
}

const drawerWidth = 240;

const SidebarMobile: FC<SidebarMobileProps> = ({ isOpen }): ReactElement => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

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
          },
        }}
        variant="temporary"
        open={isOpen}
        anchor="left"
      >
        <List sx={{ marginTop: '4em' }}>
          {[
            { icon: <HomeIcon />, text: 'Home' },
            { icon: <MusicNoteIcon />, text: 'Songs' },
            { icon: <QueueMusicIcon />, text: 'My Setlists' },
            { icon: <SupervisedUserCircleIcon />, text: 'Groups' },
            { icon: <TextSnippetIcon />, text: 'Resources' },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={selectedItem === item.text}
                onClick={() => handleClick(item.text)}
              >
                <ListItemIcon sx={{ color: selectedItem === item.text ? 'primary.main' : '' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
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

export default SidebarMobile;
