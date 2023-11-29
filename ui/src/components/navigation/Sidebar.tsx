import { FC, ReactElement, useState } from 'react';
import {
  Box,
  Drawer,
  List,
  Divider,
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

const drawerWidth = 240;

const SideBar: FC = (): ReactElement => {
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
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List sx={{ marginTop: '4em' }}>
          {[
            { icon: <HomeIcon />, text: 'Home' },
            { icon: <MusicNoteIcon />, text: 'Songs' },
            { icon: <QueueMusicIcon />, text: 'My Setlists' },
            { icon: <SupervisedUserCircleIcon />, text: 'Groups' },
            { icon: <TextSnippetIcon />, text: 'Resources' },
          ].map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ '&:hover': { backgroundColor: 'primary.light' } }}
            >
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

export default SideBar;
