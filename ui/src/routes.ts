import { FC } from 'react';
import HomeContainer from './components/home/HomeContainer';
import LoginContainer from './components/auth/LoginContainer';
import RegisterContainer from './components/auth/RegisterContainer';
import RecoverPasswordContainer from './components/auth/RecoverPasswordContainer';
import ResetPasswordContainer from './components/auth/ResetPasswordContainer';
import SongEditorContainer from './components/song/SongEditorContainer';
import SongContainer from './components/song/SongContainer';

// interface
interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<any>;
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
    path: '/password/new',
    enabled: true,
    component: ResetPasswordContainer,
  },
  {
    key: 'song-add-route',
    title: 'Add New Song',
    path: '/song/add',
    enabled: true,
    component: SongEditorContainer,
  },
  {
    key: 'song-edit-route',
    title: 'Edit Song',
    path: '/song/edit/:id',
    enabled: true,
    component: SongEditorContainer,
  },
  {
    key: 'song-route',
    title: 'Song',
    path: '/song',
    enabled: true,
    component: SongContainer,
  },
];
