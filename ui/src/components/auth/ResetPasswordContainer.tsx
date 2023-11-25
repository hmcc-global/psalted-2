import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
  AlertColor,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ResetPasswordFields } from './helpers/form.types';
import { formSpacing, formWidth } from './helpers/constants';
import { useLocation } from 'react-router-dom';

// zod validation
const resetPwdValidationSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' }),
    confirmPassword: z.string().trim(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'The passwords do not match',
      path: ['confirmPassword'],
    }
  );

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPasswordContainer: React.FC = (props: any) => {
  const { history } = props;

  const query = useQuery();

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<AlertColor | undefined>();
  const [message, setMessage] = useState('');

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const { register, handleSubmit, formState } = useForm<ResetPasswordFields>({
    resolver: zodResolver(resetPwdValidationSchema),
  });

  const { errors } = formState;

  const handleSignup: SubmitHandler<ResetPasswordFields> = async (data) => {
    console.log(data);
    setStatus('success');
    setMessage('THIS IS A TEST MESSAGEEEEE');
    setOpen(true);
    try {
      const token = query.get('token');
      const params = {
        token,
        password: data.password ? data.password : '',
      };

      const payload = await axios.post('/api/auth/reset-password', {
        params,
      });

      if (payload.status === 200) {
        setStatus('success');
        setMessage('Password successfully reset! Please login again.');
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      } else {
        setStatus('error');
        setMessage('Error resetting password, please try again.');
      }
      setOpen(true);
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setStatus('error');
        setMessage('Invalid token, please try again.');
      } else if (err.response && err.response.status === 422) {
        setStatus('error');
        setMessage('Required fields not filled');
      } else {
        setStatus('error');
        setMessage('Error resetting password, please try again.');
      }
      setOpen(true);
    }
  };

  return (
    <>
      <Box
        minHeight={'100vh'}
        sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/psalted-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box margin={'auto'} bgcolor={'transparent'} width={formWidth}>
          <Stack direction={'column'} margin={'auto'} spacing={formSpacing}>
            <Stack spacing={1}>
              <Typography variant="h1" color={'primary'} textAlign={'center'} fontWeight={'bold'}>
                RESET PASSWORD
              </Typography>
              <Typography variant={'body1'} textAlign={'center'}>
                Create a new password
              </Typography>
            </Stack>
            <form onSubmit={handleSubmit(handleSignup)}>
              <Stack spacing={formSpacing}>
                <Stack spacing={1}>
                  <TextField
                    label="Password"
                    type="password"
                    {...register('password', {
                      required: 'Required',
                    })}
                    fullWidth
                  />
                  {errors.password && (
                    <Typography variant={'body2'} color={'error'}>
                      {errors.password?.message}
                    </Typography>
                  )}
                </Stack>
                <Stack spacing={1}>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    {...register('confirmPassword', {
                      required: 'Required',
                    })}
                    fullWidth
                  />
                  {errors.confirmPassword && (
                    <Typography variant={'body2'} color={'error'}>
                      {errors.confirmPassword?.message}
                    </Typography>
                  )}
                </Stack>
                <Button type={'submit'} color={'primary'} variant={'contained'} fullWidth>
                  RESET PASSWORD
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
        <Snackbar
          open={open}
          onClose={handleClose}
          autoHideDuration={9000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity={status} sx={{ width: '100%' }} onClose={handleClose}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ResetPasswordContainer;