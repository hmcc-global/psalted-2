import axios from 'axios';
import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Container,
} from '@mui/material';
import { UserEditorFields, HomeProfileProps, otherProfileProps } from '../../types/user.types';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function HomeProfile(props: HomeProfileProps) {
  const { onBack, register, onClickChange, onClickEdit } = props;

  return (
    <Stack spacing={2} width="50%" margin={5}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '3%',
        }}
      >
        <ArrowBackIosNewIcon onClick={onBack} color="secondary" />
        <Typography variant="h3" color="primary" fontWeight="bold">
          PROFILE
        </Typography>
        <PersonIcon color="primary" style={{ marginLeft: '2%' }} />
      </div>
      <Typography variant="h3" fontWeight={400}>
        Name
      </Typography>
      <Divider style={{ marginBottom: '3%' }} />
      <TextField
        fullWidth
        disabled
        id="outlined-name"
        label="Name"
        {...register('fullName', { required: true })}
        style={{ marginBottom: '5%' }}
        sx={{
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'black',
          },
        }}
      />
      <Typography variant="h3" fontWeight={400}>
        Email
      </Typography>
      <Divider style={{ marginBottom: '3%' }} />
      <TextField
        fullWidth
        disabled
        id="outlined-email"
        label="Email"
        {...register('email', { required: true })}
        style={{ marginBottom: '5%' }}
        sx={{
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: 'black',
          },
        }}
      />
      <Button variant="contained" onClick={onClickEdit}>
        <Typography variant="subtitle2">EDIT PROFILE</Typography>
      </Button>
      <Button variant="contained" onClick={onClickChange}>
        <Typography variant="subtitle2">CHANGE PASSWORD</Typography>
      </Button>
    </Stack>
  );
}

function EditProfile(props: otherProfileProps) {
  const { onBack, onSubmit, register } = props;
  return (
    <Stack spacing={2} width="40%" margin={5}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <ArrowBackIosNewIcon onClick={onBack} sx={{ color: 'gray' }} />
        <Typography variant="h3" color="primary" fontWeight="bold">
          EDIT PROFILE
        </Typography>
        <CreateIcon color="primary" style={{ marginLeft: '2%' }} />
      </div>
      <Typography variant="h3" fontWeight={400}>
        Old Name & Email
      </Typography>
      <Divider style={{ marginBottom: '3%' }} />
      <TextField
        fullWidth
        disabled
        id="outlined-name"
        label="Name"
        {...register('fullName', { required: true })}
        style={{ marginBottom: '5%' }}
      />
      <TextField
        fullWidth
        disabled
        id="outlined-email"
        label="Email"
        {...register('email', { required: true })}
        style={{ marginBottom: '5%' }}
      />
      <Typography variant="h3" fontWeight={400}>
        New Name
      </Typography>
      <Divider style={{ marginBottom: '3%' }} />
      <form onSubmit={onSubmit} style={{ marginBottom: '10%' }}>
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
          {...register('email', { required: true })}
          style={{ marginBottom: '5%' }}
          sx={{
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'black',
            },
          }}
        />
        <Button variant="contained" type="submit" fullWidth>
          <Typography variant="subtitle2">SAVE</Typography>
        </Button>
      </form>
    </Stack>
  );
}

function ChangePassword(props: otherProfileProps) {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState(false);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);
  const { onBack, onSubmit, register } = props;

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
    <Stack spacing={2} width="40%" margin={5}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <ArrowBackIosNewIcon onClick={onBack} sx={{ color: 'gray' }} />
        <Typography variant="h3" color="primary" fontWeight="bold">
          CHANGE PASSWORD
        </Typography>
        <CreateIcon color="primary" style={{ marginLeft: '2%' }} />
      </div>

      <Typography variant="h3" fontWeight={400}>
        Old Password
      </Typography>
      <Divider style={{ marginBottom: '3%' }} />
      <form onSubmit={onSubmit} style={{ marginBottom: '10%' }}>
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
        <Typography variant="h3" fontWeight={400}>
          New Password
        </Typography>
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
          <Typography variant="subtitle2">SAVE</Typography>
        </Button>
      </form>
    </Stack>
  );
}

const ProfileDesktopView: FC = (): ReactElement => {
  const user = useSelector((state: any) => state.user);
  const { setValue, handleSubmit, register } = useForm<UserEditorFields>();
  const [userData, setUserData] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

  const fetchUserData = useCallback(async () => {
    if (user.id) {
      const { data, status } = await axios.get('/api/users/get', { params: { id: user.id } });
      if (status === 200) {
        setUserData(data);
        setUserInformationFields(data);
      }
    }
  }, [user.id]);

  const handleEditUserInformation = async (data: UserEditorFields) => {
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

  const handleChangePassword = async (data: UserEditorFields) => {
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

  const setUserInformationFields = (userData: UserEditorFields) => {
    setValue('fullName', userData['fullName']);
    setValue('email', userData['email']);
    setValue('password', userData['password']);
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
          <HomeProfile
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
    </Container>
  );
};

export default ProfileDesktopView;
