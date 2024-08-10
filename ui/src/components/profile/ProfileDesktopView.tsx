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
} from '@mui/material';
import { UserEditorFields } from '../../types/user.types';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import { useUser } from '../../helpers/customHooks';
import PageHeader from '../navigation/PageHeader';
import EditModal from './EditModal';
import ChangePasswordModal from './ChangePasswordModal';
import { useDispatch } from 'react-redux';
import { refetchUser } from '../../reducers/userSlice';

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
  // TO-DO refactor the use of react form to properly pass the values using the hooks instead of forcing it now.
  const { register, getValues } = useForm<UserEditorFields>();

  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

  const handleEditUserInformation = async (data: UserEditorFields) => {
    data._id = user?._id || '';
    const { data: updated, status } = await axios.put('/api/users/update', {
      id: data._id,
      fullName: data.fullName,
    });
    if (status === 200) {
      dispatch(refetchUser({ token, _doc: updated }));
    }
  };

  const handleChangePassword = async (data: UserEditorFields) => {
    // data.id = user?.id || '';
    // const { status } = await axios.put('/api/users/change-password', {
    //   id: data.id,
    //   currentPassword: data.currentPassword,
    //   newPassword: data.newPassword,
    // });
    // if (status === 200) {
    // fetchUserData();
    // }
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

        <Stack spacing={2} width="90%" margin="auto">
          <RowStack>
            <Typography>My Information</Typography>
            <Button startIcon={<CreateIcon />} variant="contained" onClick={editProfileHandler}>
              <Typography variant="body2">Edit</Typography>
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
            style={{ marginBottom: '5%' }}
          />
          <Divider />
          <Button variant="contained" onClick={changePassHandler}>
            <Typography variant="body2">Change Password</Typography>
          </Button>
          <Button variant="contained" onClick={changePassHandler}>
            <Typography variant="body2">Delete Account</Typography>
          </Button>
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
          open={showChangePassword}
          handleClose={backProfileHandler}
        />
      </Box>
    </Container>
  );
};

export default ProfileDesktopView;
