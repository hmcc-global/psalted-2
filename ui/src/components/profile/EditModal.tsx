import { otherProfileProps } from '#/types/user.types';
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  Modal,
  styled,
  useTheme,
} from '@mui/material';
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

const DisabledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: theme.palette.text.primary,
    color: theme.palette.text.primary,
  },
  '& .MuiInputLabel-root.Mui-disabled': {
    color: theme.palette.text.primary,
  },
  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
}));

const EditModal = (props: otherProfileProps) => {
  const { onSubmit, register, open, getFormValues, handleClose, user } = props;
  const theme = useTheme();
  return (
    <Modal open={!!open} onClose={handleClose}>
      <Box sx={modalStyle} width="40%" margin={5}>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <CreateIcon color="secondary" style={{ marginLeft: '2%' }} />
          <Typography variant="h3" color={theme.palette.text.primary}>
            EDIT PROFILE
          </Typography>
        </Box>
        <Typography variant="h3">Old Name & Email</Typography>
        <Divider style={{ marginBottom: '3%' }} />
        <DisabledTextField
          fullWidth
          disabled
          id="outlined-name"
          label="Name"
          value={user?.fullName}
          {...register('fullName', { required: true })}
          style={{ marginBottom: '5%' }}
        />
        <DisabledTextField
          fullWidth
          disabled
          id="outlined-email"
          label="Email"
          value={user?.email}
          {...register('email', { required: true })}
          style={{ marginBottom: '5%' }}
        />
        <Typography variant="h3">New Name</Typography>
        <Divider style={{ marginBottom: '3%' }} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(getFormValues());
            handleClose();
          }}
          style={{ marginBottom: '10%' }}
        >
          <TextField
            fullWidth
            id="outlined-name"
            {...register('fullName')}
            label="Enter New Name"
            style={{ marginBottom: '5%' }}
          />
          <TextField
            fullWidth
            disabled
            id="outlined-email"
            label="Email"
            value={user?.email}
            {...register('email', { required: true })}
            style={{ marginBottom: '5%' }}
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'white',
              },
            }}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              <Typography variant="body2">Save</Typography>
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditModal;
