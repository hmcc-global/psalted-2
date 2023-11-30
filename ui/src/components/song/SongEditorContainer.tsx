import { useState, useEffect } from 'react';
import SongEditorDesktopView from './SongEditorDesktopView';
import SongEditorMobileView from './SongEditorMobileView';

interface windowSize {
  width: number | undefined;
  height: number | undefined;
}

// Custom Hook to detect screen size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState<windowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

const SongEditorContainer = () => {
  const size = useWindowSize();

  return (
    <div>
      {size.width && size.width <= 768 ? (
        <SongEditorMobileView actionOnEditor="ADD NEW" />
      ) : (
        <SongEditorDesktopView actionOnEditor="ADD NEW" />
      )}
    </div>
  );
};

export default SongEditorContainer;
