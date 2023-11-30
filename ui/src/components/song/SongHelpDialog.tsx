import { FC, useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';

// ICONS
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';

const SongHelpDialog: FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenHelpDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <HelpOutlineIcon color="secondary" onClick={handleOpenHelpDialog} />
      <Dialog open={open} onClose={handleOpenHelpDialog}>
        <DialogTitle variant="h2" fontWeight="700" color="primary">
          Markdown Hints
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleOpenHelpDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            <Typography color="primary" mb={2}>
              Use hashtags “#” to indicate sections <br />
              Use square brackets “[ ]” to indicate chords
            </Typography>

            <Typography color="secondary.light" fontWeight="700">
              Example:
            </Typography>
            <Typography color="secondary.light">
              #Verse 1 <br />
              [D]When the music [A]fades, all is stripped [Em]away <br />
              And I simply [A]come <br />
              [D]Longing just to [A]bring something that's of [Em]worth <br />
              That will bless Your [A]heart <br />
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SongHelpDialog;
