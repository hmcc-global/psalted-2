import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { forwardRef } from 'react';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

type SetlistSearchResultProps = {
  _id: string;
  name: string;
  keyword: string;
  isFocused: boolean;
};

const SetlistSearchResult = forwardRef<HTMLDivElement, SetlistSearchResultProps>((props, ref?) => {
  const navigate = useNavigate();

  const { _id, name, keyword, isFocused } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5rem',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        p: '0.75rem',
        borderRadius: '5px',
        '&:hover, &:focus': {
          backgroundColor: '#6750A4',
        },
        backgroundColor: isFocused ? '#6750A4' : '#2B2930',
        cursor: 'pointer',
        outline: 'none',
      }}
      ref={ref}
      onClick={() => {
        navigate(`/setlist/${_id}`);
      }}
    >
      <QueueMusicIcon sx={{ color: '#CAC4D0' }} />
      <Typography variant="body1" color="#CAC4D0">
        {keyword === '' ? 'Explore all setlists' : name}
      </Typography>
    </Box>
  );
});

export default SetlistSearchResult;
