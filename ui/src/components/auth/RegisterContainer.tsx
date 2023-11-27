import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RegisterFormFields } from './helpers/form.types';
import { formSpacing, formWidth } from './helpers/constants';

// zod validation
const registerValidationSchema = z
  .object({
    fullName: z.string().trim().min(1, { message: 'Please enter your full name' }).max(100),
    email: z.string().email({ message: 'Please enter a valid email' }).trim(),
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

const RegisterContainer: React.FC = (props: any) => {
  const { history } = props;

  const { register, handleSubmit, formState } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerValidationSchema),
  });

  const { errors } = formState;

  const [invalidResgistration, setInvalidRegistration] = useState('');

  const handleRegister: SubmitHandler<RegisterFormFields> = async (data) => {
    try {
      const payload = await axios.post('/api/auth/signup', {
        fullName: data.fullName,
        email: data.email,
        password: data.password ? data.password : '',
      });
      if (payload.status === 200) {
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        console.log('Email already exists');
        setInvalidRegistration('Email already exists, please try with another email');
      } else if (err.response && err.response.status === 422) {
        console.log('Required fields not filled');
        setInvalidRegistration('Required fields not filled');
      }
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
                REGISTER
              </Typography>
              <Typography variant={'body1'} textAlign={'center'}>
                Create a New Account
              </Typography>
            </Stack>
            <form onSubmit={handleSubmit(handleRegister)}>
              <Stack spacing={formSpacing}>
                <Stack spacing={1}>
                  <TextField
                    label="Full Name"
                    fullWidth
                    {...register('fullName', {
                      required: 'Required',
                    })}
                  />
                  {errors.fullName && (
                    <Typography variant={'body2'} color={'error'}>
                      {errors.fullName?.message}
                    </Typography>
                  )}
                </Stack>
                <Stack spacing={1}>
                  <TextField
                    label="Email"
                    fullWidth
                    autoComplete={'email'}
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
                {invalidResgistration ? (
                  <Typography variant={'body2'} color={'error'}>
                    {invalidResgistration}
                  </Typography>
                ) : null}
                <Button type={'submit'} color={'primary'} variant={'contained'} fullWidth>
                  REGISTER
                </Button>
                <Link href="/login" underline={'hover'} variant="button" textAlign={'center'}>
                  ALREADY HAVE AN ACCOUNT? LOGIN
                </Link>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default RegisterContainer;
