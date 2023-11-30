import React from 'react';
import { Box, List, ListItem, ListItemText, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FC, ReactElement } from 'react';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

const SongTab: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px',
        borderRadius: '4px',
        backgroundColor: 'primary.light',
        height: '40vh',
        position: 'relative', // Enable positioning of the plus button
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          width: '100%',
        }}
      >
        <Typography variant="h6" color="primary">
          Groups
        </Typography>
        <SupervisedUserCircleIcon color="primary" sx={{ fontSize: '20', marginLeft: '8px' }} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <List>
          <ListItem>
            <ListItemText primary="Group Name 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Group Name 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Group Name 3" />
          </ListItem>
        </List>
      </Box>
      <Fab
        color="primary"
        aria-label="Add"
        size="medium"
        sx={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default SongTab;
