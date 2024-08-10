import { otherProfileProps } from '#/types/user.types';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  Box,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Modal,
} from '@mui/material';
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CreateIcon from '@mui/icons-material/Create';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ChangePasswordModal = (props: otherProfileProps) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState(false);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);
  const { open, onSubmit, getFormValues, register, handleClose } = props;

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onVerifyPassword = () => {
    if (newPassword !== confirmPassword) {
      setMatchPassword(false);
      return;
    } else {
      setMatchPassword(true);
    }
  };

  return (
    <Modal open={!!open} onClose={handleClose}>
      <Box sx={modalStyle} width="40%" margin={5}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <ArrowBackIosNewIcon onClick={handleClose} sx={{ color: 'gray' }} />
          <Typography variant="h3" color="primary">
            CHANGE PASSWORD
          </Typography>
          <CreateIcon color="primary" style={{ marginLeft: '2%' }} />
        </div>

        <Typography variant="h3">Old Password</Typography>
        <Divider style={{ marginBottom: '3%' }} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(getFormValues());
          }}
          style={{ marginBottom: '10%' }}
        >
          <TextField
            fullWidth
            id="outlined-old-password"
            {...register('currentPassword')}
            label="Enter Old Password"
            style={{ marginBottom: '5%' }}
            type={showOldPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="h3">New Password</Typography>
          <Divider style={{ marginTop: '2%', marginBottom: '3%' }} />
          <TextField
            fullWidth
            id="outlined-adornment-password"
            label="New Password"
            style={{ marginBottom: '5%' }}
            type={showNewPassword ? 'text' : 'password'}
            {...register('newPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={onVerifyPassword}
          />
          {/* TODO: error handling still aint right */}
          <TextField
            fullWidth
            id="outlined-basic"
            label="Confirm New Password"
            style={{ marginBottom: '5%' }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={onVerifyPassword}
            error={!matchPassword}
            helperText={!matchPassword ? 'Password does not match!' : ' '}
            type={showConfirmNewPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" type="submit" fullWidth>
            <Typography variant="body2">SAVE</Typography>
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
