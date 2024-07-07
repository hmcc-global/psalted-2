import { Menu, MenuItem } from '@mui/material';

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
};
const SetlistViewMenu = (props: Props) => {
  const { onClose } = props;

  const handleShare = () => {
    onClose();
  };

  return (
    <Menu {...props}>
      <MenuItem onClick={handleShare}>Share Setlist</MenuItem>
    </Menu>
  );
};

export default SetlistViewMenu;
