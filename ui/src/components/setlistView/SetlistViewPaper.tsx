import { Box, Stack, styled } from '@mui/material';

export const HeaderSetlistView = styled(Box)({
  borderRadius: '16px',
  padding: '24px',
  margin: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  background:
    'linear-gradient(158deg, rgba(0, 0, 0, 0.00) 31.44%, rgba(148, 111, 255, 0.20) 80.34%), radial-gradient(111.68% 110.13% at 66.1% 8.28%, rgba(154, 118, 255, 0.20) 36.5%, rgba(0, 0, 0, 0.20) 64%), #1F1F1F',
});

export const SongSelectTable = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.dark}`,
  borderRadius: '16px',
  '& div:last-child': {
    borderBottom: 'none',
  },
}));

export const SongSelectRow = styled(Box)(({ theme }) => ({
  padding: '16px 24px',
  borderBottom: `1px solid ${theme.palette.secondary.dark}`,
}));

export const SetlistViewFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  background: theme.palette.background.paper,
  width: '100%',
  padding: '16px',
  marginTop: '16px',
}));
