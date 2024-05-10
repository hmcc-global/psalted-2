import { Box, Typography, Stack } from '@mui/material';
import { ElementType, FC, ReactElement } from 'react';

type HomeTabProps = {
  title: string;
  description: string;
  Icon: ElementType;
};

const HomeTab: FC<HomeTabProps> = ({ title, description, Icon }): ReactElement => {
  return (
    <Box
      sx={{
        padding: '2em',
        borderRadius: '40px',
        backgroundColor: 'primary.darker',
      }}
    >
      <Stack direction={'row'} alignItems="center" justifyContent="space-between">
        <Stack direction="column" spacing={1}>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
        </Stack>

        <Icon
          sx={{
            color: 'primary.light',
            backgroundColor: 'primary.dark',
            borderRadius: '50%',
            width: '2em',
            height: '2em',
            padding: '0.5em',
          }}
        />
      </Stack>
    </Box>
  );
};

export default HomeTab;
