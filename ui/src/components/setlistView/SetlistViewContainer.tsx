import { useMediaQuery } from '@mui/material';
import SetlistViewContainerMobile from './SetlistViewContainerMobile';
import SetlistViewContainerDesktop from './SetlistViewContainerDesktop';

const SetlistViewContainer = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <SetlistViewContainerMobile /> : <SetlistViewContainerDesktop />;
};

export default SetlistViewContainer;
