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
import { Link as RouterLink } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RecoverPasswordFields } from '../../types/form.types';
import { formSpacing, formWidth } from '../../constants';
import { ArrowBackRounded } from '@mui/icons-material';
import { emailValidator } from './helpers/zod.validators';

// zod validation
const recoverPwdValidationSchema = z.object({
  email: emailValidator,
});

const RecoverPasswordContainer: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<AlertColor | undefined>();
  const [message, setMessage] = useState<string>('');

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const { register, handleSubmit, formState } = useForm<RecoverPasswordFields>({
    resolver: zodResolver(recoverPwdValidationSchema),
  });

  const { errors } = formState;

  const handleRecoverPassword: SubmitHandler<RecoverPasswordFields> = async (data) => {
    try {
      const payload = await axios.post('/api/auth/forgot-password', {
        email: data.email,
      });

      if (payload.status === 200) {
        setStatus('success');
        setMessage('Password recovery email successfully sent! Please check your email.');
      } else {
        setStatus('error');
        setMessage('An error occurred. Please try again.');
      }
      setOpen(true);
    } catch (err: any) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
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
          <Box
            display="flex"
            alignItems="center"
            component={RouterLink}
            to="/"
            color="primary"
            sx={{ textDecoration: 'none' }}
            marginBottom={'5rem'}
          >
            <ArrowBackRounded color="primary" />
            <Typography variant="body1" color={'primary'} marginLeft={1}>
              Return to Home
            </Typography>
          </Box>
          <Stack direction={'column'} margin={'auto'} spacing={formSpacing}>
            <Stack spacing={1}>
              <Typography variant="h1" color={'primary'} textAlign={'center'} fontWeight={'bold'}>
                RECOVER PASSWORD
              </Typography>
            </Stack>
            <form onSubmit={handleSubmit(handleRecoverPassword)}>
              <Stack spacing={formSpacing}>
                <Stack spacing={1}>
                  <TextField
                    label="Email"
                    {...register('email', {
                      required: 'Required',
                    })}
                    fullWidth
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                  />
                </Stack>
                <Typography variant={'body1'} textAlign={'left'}>
                  Please input the email you used to create your HMCC account This will only be
                  applicable if you signed up using your personal email
                </Typography>
                <Button type={'submit'} color={'primary'} variant={'contained'} fullWidth>
                  SEND RECOVERY LINK
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

export default RecoverPasswordContainer;
