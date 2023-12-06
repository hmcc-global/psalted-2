import { FC, ReactElement } from 'react';
import ProfileDesktopView from './ProfileDesktopView';
import ProfileMobileView from './ProfileMobileView';
import { useMediaQuery } from '@mui/material';

const ProfileContainer: FC = (): ReactElement => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <ProfileMobileView /> : <ProfileDesktopView />;
};

export default ProfileContainer;
