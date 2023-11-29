import axios from 'axios';
import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function HomeProfile(props: any) {
  return (
    <Stack spacing={2} width="100%">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <ArrowBackIosNewIcon onClick={props.onBack} sx={{ color: 'gray' }} />
        <Typography variant="h3" color="primary" fontWeight="bold">
          PROFILE
        </Typography>
      </div>
      <TextField
        fullWidth
        disabled
        id="outlined-name"
        label="Name"
        {...props.register('fullName', { required: true })}
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
        {...props.register('email', { required: true })}
        sx={{
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'black',
          },
        }}
      />
      <Button variant="outlined" onClick={props.onClickEdit} style={{ width: '45%' }}>
        <Typography variant="subtitle2">EDIT PROFILE</Typography>
      </Button>
      <Button variant="outlined" onClick={props.onClickChange} style={{ width: '60%' }}>
        <Typography variant="subtitle2">CHANGE PASSWORD</Typography>
      </Button>
    </Stack>
  );
}

function EditProfile(props: any) {
  return (
    <Stack spacing={2} width="100%">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <ArrowBackIosNewIcon onClick={props.onBack} sx={{ color: 'gray' }} />
          <Typography variant="h3" color="primary" fontWeight="bold">
            EDIT PROFILE
          </Typography>
        </div>
        <CreateIcon color="primary" />
      </div>
      <form onSubmit={props.onSubmit} style={{ marginBottom: '10%' }}>
        <TextField
          fullWidth
          id="outlined-name"
          {...props.register('fullName')}
          label="Name"
          style={{ marginBottom: '5%' }}
        />
        <TextField
          fullWidth
          disabled
          id="outlined-email"
          label="Email"
          {...props.register('email', { required: true })}
          style={{ marginBottom: '5%' }}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'black',
            },
          }}
        />
        <Button variant="contained" type="submit">
          <Typography variant="subtitle2">SAVE</Typography>
        </Button>
      </form>
    </Stack>
  );
}

function ChangePassword(props: any) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState(false);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);

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
    <Stack spacing={2} width="100%">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <ArrowBackIosNewIcon onClick={props.onBack} sx={{ color: 'gray' }} />
          <Typography variant="h3" color="primary" fontWeight="bold">
            CHANGE PASSWORD
          </Typography>
        </div>
        <CreateIcon color="primary" />
      </div>

      <form onSubmit={props.onSubmit} style={{ marginBottom: '10%' }}>
        <TextField
          fullWidth
          id="outlined-old-password"
          {...props.register('currentPassword')}
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
        <TextField
          fullWidth
          id="outlined-adornment-password"
          label="New Password"
          style={{ marginBottom: '5%' }}
          onChange={(e) => setNewPassword(e.target.value)}
          onBlur={onVerifyPassword}
          type={showNewPassword ? 'text' : 'password'}
          {...props.register('newPassword')}
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
        <Button variant="contained" type="submit">
          <Typography variant="subtitle2">CHANGE PASSWORD</Typography>
        </Button>
      </form>
    </Stack>
  );
}

const ProfileContainerMobile: FC = (props: any): ReactElement => {
  const user = useSelector((state: any) => state.user);

  const { setValue, handleSubmit, register } = useForm();
  const [userData, setUserData] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const settableDataFields = ['email', 'fullName', 'password'];

  const fetchUserData = useCallback(async () => {
    if (user.id) {
      const { data, status } = await axios.get('/api/users/get', { params: { userId: user.id } });

      if (status === 200) {
        setUserData(data[0]);
        setUserInformationFields(data[0]);
      }
    }
  }, [user.id]);

  const handleEditUserInformation = async (data: any, e: any) => {
    data.id = user.id;

    const { status } = await axios.put('/api/users/update', {
      email: data.email,
      id: data.id,
      fullName: data.fullName,
    });
    if (status === 200) {
      fetchUserData();
    }
  };

  const handleChangePassword = async (data: any, e: any) => {
    data.id = user.id;

    const { status } = await axios.put('/api/users/change-password', {
      id: data.id,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (status === 200) {
      fetchUserData();
    }
  };

  const setUserInformationFields = (userData: any) => {
    for (let key in userData) {
      if (settableDataFields.includes(key)) {
        setValue(key, userData[key]);
      }
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

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
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
      {/* TODO: ADD NAVBAR LATER */}
      {!showEditProfile && !showChangePassword && (
        <HomeProfile
          name={'fullName'}
          onClickEdit={editProfileHandler}
          onClickChange={changePassHandler}
          onBack={backProfileHandler}
          register={register}
        />
      )}
      {showEditProfile && !showChangePassword && (
        <EditProfile
          onBack={backProfileHandler}
          onSubmit={handleSubmit(handleEditUserInformation)}
          register={register}
        />
      )}
      {!showEditProfile && showChangePassword && (
        <ChangePassword
          onSubmit={handleSubmit(handleChangePassword)}
          onBack={backProfileHandler}
          register={register}
        />
      )}
    </Box>
  );
};

export default ProfileContainerMobile;
