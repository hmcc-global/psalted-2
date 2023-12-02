import SongEditorDesktopView from './SongEditorDesktopView';
import SongEditorMobileView from './SongEditorMobileView';
import { useMediaQuery } from '@mui/material';

const SongEditorContainer = () => {
  // hook to detect the window size
  const isMobile = useMediaQuery('(max-width: 768px)');

  // render the mobile view if the window size is less than 768px
  return isMobile ? (
    <SongEditorMobileView actionOnEditor="ADD NEW" />
  ) : (
    <SongEditorDesktopView actionOnEditor="ADD NEW" />
  );
};

export default SongEditorContainer;
