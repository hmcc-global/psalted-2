import { Box, Typography } from '@mui/material';

const RadioCard = (props: any) => {
  const { children, isSelected, onClick } = props;

  return (
    <Box
      sx={{
        cursor: 'pointer',
        border: 1,
        borderRadius: '5px',
        borderColor: isSelected ? '#6750A4' : '#938F99',
        backgroundColor: isSelected ? '#6750A4' : '#2B2930',
        fontWeight: isSelected ? '500' : 'normal',
        px: '0.6rem',
        py: '0.3rem',
      }}
      onClick={onClick}
    >
      <Typography variant="body2" fontWeight={isSelected ? '500' : 'normal'} color="#CAC4D0">
        {children}
      </Typography>
    </Box>
  );
};

export default RadioCard;
