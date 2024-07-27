import { Box, styled } from '@mui/material';

export const SearchButtonBox = styled(Box)(({ theme }) => ({
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
}));
