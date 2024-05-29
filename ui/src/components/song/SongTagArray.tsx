import { FieldArrayProps } from '#/types/song.types';
import { Typography, Stack, Chip } from '@mui/material';

const SongTagArray = ({ data }: FieldArrayProps) => {
  if (Array.isArray(data)) {
    if (data.length === 0) return <Typography>-</Typography>;
    return (
      <Stack spacing={1} direction="row">
        {data.map((item: string, i: number) => {
          return <Chip sx={{ bgcolor: 'primary.light' }} size="medium" key={i} label={item} />;
        })}
      </Stack>
    );
  }
  return null;
};

export default SongTagArray;
