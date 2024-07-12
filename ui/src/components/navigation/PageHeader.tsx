import { Box, Typography } from '@mui/material';

type PageHeaderProps = {
  title: string;
  icon: React.ReactNode;
  actionButtons?: React.ReactNode;
};

const PageHeader = (props: PageHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        mb: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.main',
            borderRadius: '100%',
            padding: '1rem',
            display: 'flex',
            flexDir: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {props.icon}
        </Box>
        <Typography variant="h1" color="#FFFFFF">
          {props.title}
        </Typography>
      </Box>
      {props.actionButtons}
    </Box>
  );
};

export default PageHeader;
