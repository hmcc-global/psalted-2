import { FC, ReactElement } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, InputBase, Divider } from '@mui/material';
import { Search } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';

const NavBar: FC = (): ReactElement => {
  return (
    <Box>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'white' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" color="primary">
            Psalted 2.0
          </Typography>
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid',
              borderColor: 'grey.500',
              borderRadius: '0.5rem',
              boxShadow:
                '0px 1px 2px 0px rgba(0, 0, 0, 0.20), 0px 0.1px 0.3px 0px rgba(0, 0, 0, 0.10)',
              width: '50vw',
              background: '#FFF',
            }}
          >
            <IconButton size="medium" edge="end">
              <Search />
            </IconButton>
            <InputBase placeholder="Search..." sx={{ ml: 1 }} />
          </Box>
          <IconButton size="medium" edge="end">
            <PersonIcon color="primary" />
          </IconButton>
        </Toolbar>
        <Divider
          variant="middle"
          sx={{ backgroundColor: 'grey', width: '110vw', marginX: '-2vw' }}
        />
      </AppBar>
    </Box>
  );
};

export default NavBar;
