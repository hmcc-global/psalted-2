import axios from 'axios';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField, Typography, Container } from '@mui/material';
import { UserEditorFields } from '../../types/user.types';
import { useUser } from '../../helpers/customHooks';
import EditModal from './EditModal';
import ChangePasswordModal from './ChangePasswordModal';

const ProfileMobileView: FC = (): ReactElement => {
  const { user } = useUser();
  const { register, getValues } = useForm<UserEditorFields>();
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

  const handleEditUserInformation = async (data: UserEditorFields) => {
    // data.id = user?.id || '';
    // const { status } = await axios.put('/api/users/update', {
    //   email: data.email,
    //   id: data.id,
    //   fullName: data.fullName,
    // });
    // if (status === 200) {
    //   // fetchUserData();
    // }
  };

  const handleChangePassword = async (data: UserEditorFields) => {
    // data.id = user?.id || '';
    // const { status } = await axios.put('/api/users/change-password', {
    //   id: data.id,
    //   currentPassword: data.currentPassword,
    //   newPassword: data.newPassword,
    // });
    // if (status === 200) {
    //   // fetchUserData();
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
            <Button variant="outlined" onClick={changePassHandler} style={{ width: '60%' }}>
              <Typography variant="body2">CHANGE PASSWORD</Typography>
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
          handleClose={backProfileHandler}
          getFormValues={getValues}
          register={register}
        />
      </Box>
    </Container>
  );
};

export default ProfileMobileView;
