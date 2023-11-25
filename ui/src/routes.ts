import { FC } from 'react';
import HomeContainer from './components/home/HomeContainer';
import LoginContainer from './components/auth/LoginContainer';
import RegisterContainer from './components/auth/RegisterContainer';
import RecoverPasswordContainer from './components/auth/RecoverPassword';
import ResetPasswordContainer from './components/auth/ResetPasswordContainer';

// interface
interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
}

export const routes: Array<Route> = [
  {
    key: 'home-route',
    title: 'Home',
    path: '/',
    enabled: true,
    component: HomeContainer,
  },
  {
    key: 'login-route',
    title: 'Login',
    path: '/login',
    enabled: true,
    component: LoginContainer,
  },
  {
    key: 'register-route',
    title: 'Register',
    path: '/register',
    enabled: true,
    component: RegisterContainer,
  },
  {
    key: 'recover-password-route',
    title: 'Recover Password',
    path: '/password/recover',
    enabled: true,
    component: RecoverPasswordContainer,
  },
  {
    key: 'reset-password-route',
    title: 'Reset Password',
    path: '/password/reset',
    enabled: true,
    component: ResetPasswordContainer,
  },
];
