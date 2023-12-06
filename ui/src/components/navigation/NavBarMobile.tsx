import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

interface NavBarMobileProps {
  onToggleSidebar: () => void;
}

const NavBarMobile: FC<NavBarMobileProps> = ({ onToggleSidebar }): ReactElement => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'white' }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onToggleSidebar}
          >
            <MenuIcon color="primary" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary' }}>
            Psalted 2.0
          </Typography>
          <IconButton onClick={() => navigate('/profile')}>
            <PersonIcon color="primary" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBarMobile;
