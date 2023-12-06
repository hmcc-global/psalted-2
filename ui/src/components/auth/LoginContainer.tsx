import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signin } from '../../reducers/userSlice';
import axios from 'axios';
import { Box, Button, Checkbox, Link, Stack, TextField, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginFormFields } from '../../types/form.types';
import { formSpacing, formWidth } from '../../constants';
import { emailValidator, passwordValidator } from './helpers/zod.validators';

// zod validation
const loginValidationSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});

const LoginContainer: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormFields>({
    resolver: zodResolver(loginValidationSchema),
  });

  const { errors } = formState;

  const [invalidLogin, setInvalidLogin] = useState<string>('');
  const [rememberPassword, setRememberPassword] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleEmailLogin: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const payload = await axios.post('/api/auth/login', {
        email: data.email,
        password: data.password ?? '',
        isRememberPassword: rememberPassword,
      });
      dispatch(signin(payload.data));
      setInvalidLogin('');
      window.location.reload();
    } catch (error: any) {
      if (error?.response?.status === 500 || error?.response?.status === 401) {
        setInvalidLogin('Invalid email or wrong password');
      }
      console.log(error);
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
            <Stack spacing={0.5}>
              <Typography variant="h1" color={'primary'} textAlign={'center'} fontWeight={'bold'}>
                LOGIN
              </Typography>
              <Typography variant={'body1'} textAlign={'center'}>
                Welcome Back
              </Typography>
            </Stack>
            <form onSubmit={handleSubmit(handleEmailLogin)}>
              <Stack spacing={formSpacing}>
                <Stack spacing={1}>
                  <TextField
                    label="Email"
                    fullWidth
                    autoComplete={'email'}
                    autoFocus
                    {...register('email', {
                      required: 'Required',
                    })}
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                  />
                </Stack>
                <Stack spacing={1}>
                  <TextField
                    label="Password"
                    type="password"
                    {...register('password', {
                      required: 'Required',
                    })}
                    autoComplete={'password'}
                    fullWidth
                    error={!!errors?.password?.message}
                    helperText={errors?.password?.message}
                  />
                </Stack>
                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                  <Checkbox
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setRememberPassword(e.target.checked)
                    }
                    checked={rememberPassword}
                  />
                  <Typography variant={'body2'}>Remember me</Typography>
                </Stack>
                {invalidLogin ? (
                  <Typography variant={'body2'} color={'error'}>
                    {invalidLogin}
                  </Typography>
                ) : null}
                <Button type={'submit'} color={'primary'} variant={'contained'} fullWidth>
                  LOGIN
                </Button>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Link href="/register" underline={'hover'} variant="button">
                    CREATE ACCOUNT
                  </Link>
                  <Link href="/password/recover" underline={'hover'} variant="button">
                    FORGOT PASSWORD?
                  </Link>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default LoginContainer;
