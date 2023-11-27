import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signin } from '../../reducers/userSlice';
import axios from 'axios';
import { Box, Button, Checkbox, Link, Stack, TextField, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginFormFields } from './helpers/form.types';
import { formSpacing, formWidth } from './helpers/constants';

// zod validation
const loginValidationSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }).trim(),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must be at most 100 characters long' }),
});

const LoginContainer: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<LoginFormFields>({
    resolver: zodResolver(loginValidationSchema),
  });

  const { errors } = formState;

  const [invalidLogin, setInvalidLogin] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);

  const dispatch = useDispatch();

  const handleEmailLogin: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      const payload = await axios.post('/api/auth/login', {
        email: data.email,
        password: data.password ? data.password : '',
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
            {/* <Box
              component="img"
              src={`${process.env.PUBLIC_URL}/images/ripple.png`}
              alt="Logo"
              height={{ xs: '4.5vh', sm: '5.5vh', md: '6.5vh', lg: '7.5vh', xl: '8.5vh' }}
              sx={{ filter: 'invert(0.6)' }}
              alignSelf={'center'}
            />
            <Typography
              variant="subtitle1"
              color="#656565"
              textAlign={'center'}
              fontWeight={'bold'}
            >
              Psalted 2.0
            </Typography> */}
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
                  />
                  {errors.email && (
                    <Typography variant={'body2'} color={'error'}>
                      {errors.email?.message}
                    </Typography>
                  )}
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
                  />
                  {errors.password && (
                    <Typography variant={'body2'} color={'error'}>
                      {errors.password?.message}
                    </Typography>
                  )}
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
