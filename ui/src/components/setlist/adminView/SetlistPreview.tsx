import { Box } from '@mui/material';
import SetlistViewContainerMobile from '../../../components/setlistView/SetlistViewContainerMobile';

const SetlistPreview = () => {
  return (
    <Box>
      <SetlistViewContainerMobile preview={true} />
    </Box>
  );
};

export default SetlistPreview;
