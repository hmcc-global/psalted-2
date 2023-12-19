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
        padding: '1em',
        borderRadius: '4px',
        backgroundColor: 'primary.light',
        height: '40vh',
        position: 'relative',
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
        <Typography variant="h3" fontWeight="500" color="primary">
          Groups
        </Typography>
        <SupervisedUserCircleIcon color="primary" sx={{ marginLeft: '1em' }} />
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
          marginLeft: 'auto',
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default SongTab;
