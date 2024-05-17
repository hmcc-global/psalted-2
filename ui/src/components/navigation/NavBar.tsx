import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton, InputBase, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

const NavBar: FC = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ bgcolor: '#171717', alignItems: 'center', py: 1 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow:
                '0px 1px 2px 0px rgba(0, 0, 0, 0.20), 0px 0.1px 0.3px 0px rgba(0, 0, 0, 0.10)',
              width: '40vw',
              background: '#2B2930',
              borderRadius: '100px',
            }}
          >
            {/* TODO: Add search functionality */}
            <IconButton size="medium" edge="end">
              <SearchIcon sx={{ mx: 2, color: '#CAC4D0' }} />
            </IconButton>
            <InputBase
              placeholder="Search..."
              sx={{ my: 1.5, color: '#CAC4D0', background: '#2B2930' }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
