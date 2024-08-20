import axios from 'axios';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  Container,
  styled,
  useTheme,
} from '@mui/material';
import { UserEditorFields } from '../../types/user.types';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import { useUser } from '../../helpers/customHooks';
import PageHeader from '../navigation/PageHeader';
import EditModal from './EditModal';
import ChangePasswordModal from './ChangePasswordModal';
import { useDispatch } from 'react-redux';
import { refetchUser, signout } from '../../reducers/userSlice';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';

const RowStack = styled(Stack)({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
});

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

const ProfileDesktopView: FC = (): ReactElement => {
  const { token, user } = useUser();
  const dispatch = useDispatch();
  const theme = useTheme();
  // TO-DO refactor the use of react form to properly pass the values using the hooks instead of forcing it now.
  const { register, getValues } = useForm<UserEditorFields>();

  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

  const handleEditUserInformation = async (data: UserEditorFields) => {
    data._id = user?._id || '';
    try {
      const { data: updated, status } = await axios.put('/api/users/update', {
        id: data._id,
        fullName: data.fullName,
      });
      if (status === 200) {
        dispatch(refetchUser({ token, _doc: updated }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePassword = async (data: UserEditorFields) => {
    data._id = user?._id || '';
    try {
      const { data: updated, status } = await axios.put('/api/users/change-password', {
        id: data._id,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (status === 200) {
        dispatch(refetchUser({ token, _doc: updated }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editProfileHandler = () => {
    setShowEditProfile(true);
    setShowChangePassword(false);
  };

  const changePassHandler = () => {
    setShowChangePassword(true);
    setShowEditProfile(false);
  };

  const backProfileHandler = () => {
    if (showEditProfile) {
      setShowEditProfile(false);
    } else if (showChangePassword) {
      setShowChangePassword(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{ py: '1rem', px: '1.5rem', ml: '0', height: '100%', overflow: 'auto' }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          alignItems: 'left',
          padding: 2,
        }}
      >
        <PageHeader title="Profile" icon={<PersonIcon />} />

        <Stack
          style={{
            background: theme.palette.background.paper,
            padding: '24px',
            borderRadius: '8px',
            marginTop: '16px',
          }}
          spacing={2}
          width="90%"
        >
          <RowStack>
            <Typography variant="h2">My Information</Typography>
            <Button
              style={{ borderRadius: '28px', padding: '12px 24px' }}
              startIcon={<CreateIcon />}
              variant="contained"
              color="secondary"
              onClick={editProfileHandler}
            >
              <Typography color="inherit" variant="h5">
                Edit
              </Typography>
            </Button>
          </RowStack>
          <RowStack>
            <DisabledTextField
              fullWidth
              disabled
              id="outlined-name"
              label="Name"
              variant="outlined"
              value={user?.fullName}
              {...register('fullName', { required: true })}
            />
          </RowStack>
          <DisabledTextField
            fullWidth
            disabled
            id="outlined-email"
            label="Email"
            value={user?.email}
            {...register('email', { required: true })}
            style={{ marginBottom: '16px' }}
          />
          <Divider style={{ borderColor: theme.palette.secondary.dark, marginBottom: '16px' }} />
          <Box display="flex" flexDirection="column" alignItems="flex-start" gap="16px">
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonIcon />}
              onClick={() => dispatch(signout(''))}
              style={{ borderRadius: '20px' }}
            >
              <Typography color="inherit" variant="h5">
                Log out
              </Typography>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LockIcon />}
              onClick={changePassHandler}
              style={{ borderRadius: '20px' }}
              disabled={user?.password === ''}
            >
              <Typography color="inherit" variant="h5">
                {user?.password === '' ? 'Google Login cannot change password' : 'Change Password'}
              </Typography>
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="contained"
              color="warning"
              style={{ borderRadius: '20px' }}
            >
              <Typography color="inherit" variant="h5">
                Delete Account (Coming Soon)
              </Typography>
            </Button>
          </Box>
        </Stack>
        <EditModal
          onSubmit={handleEditUserInformation}
          register={register}
          getFormValues={getValues}
          user={user}
          open={showEditProfile}
          handleClose={backProfileHandler}
        />
        <ChangePasswordModal
          onSubmit={handleChangePassword}
          getFormValues={getValues}
          register={register}
          user={user}
          open={showChangePassword}
          handleClose={backProfileHandler}
        />
      </Box>
    </Container>
  );
};

export default ProfileDesktopView;
