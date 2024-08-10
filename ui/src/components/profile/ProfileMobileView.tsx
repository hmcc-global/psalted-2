import axios from 'axios';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField, Typography, Container } from '@mui/material';
import { UserEditorFields } from '../../types/user.types';
import { useUser } from '../../helpers/customHooks';
import EditModal from './EditModal';
import ChangePasswordModal from './ChangePasswordModal';
import { useDispatch } from 'react-redux';
import { refetchUser } from '../../reducers/userSlice';

const ProfileMobileView: FC = (): ReactElement => {
  const { token, user } = useUser();
  const dispatch = useDispatch();
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
    <Container>
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
        {!showEditProfile && !showChangePassword && (
          <Stack spacing={2} width="100%">
            <TextField
              fullWidth
              disabled
              id="outlined-name"
              label="Name"
              value={user?.fullName}
              {...register('fullName', { required: true })}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: 'black',
                },
              }}
            />
            <TextField
              fullWidth
              disabled
              id="outlined-email"
              label="Email"
              value={user?.email}
              {...register('email', { required: true })}
              sx={{
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: 'black',
                },
              }}
            />
            <Button variant="outlined" onClick={editProfileHandler} style={{ width: '45%' }}>
              <Typography variant="body2">EDIT PROFILE</Typography>
            </Button>
            <Button
              variant="outlined"
              onClick={changePassHandler}
              style={{ width: '60%' }}
              disabled={user?.password === ''}
            >
              <Typography variant="body2">
                {user?.password === '' ? 'Google Login cannot change password' : 'Change Password'}
              </Typography>
            </Button>
          </Stack>
        )}
        <EditModal
          handleClose={backProfileHandler}
          open={showEditProfile}
          onSubmit={handleEditUserInformation}
          getFormValues={getValues}
          register={register}
          user={user}
        />

        <ChangePasswordModal
          onSubmit={handleChangePassword}
          open={showChangePassword}
          user={user}
          handleClose={backProfileHandler}
          getFormValues={getValues}
          register={register}
        />
      </Box>
    </Container>
  );
};

export default ProfileMobileView;
