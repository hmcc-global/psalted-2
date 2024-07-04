import { FC } from 'react';
import HomeContainer from './components/home/HomeContainer';
import LoginContainer from './components/auth/LoginContainer';
import RegisterContainer from './components/auth/RegisterContainer';
import RecoverPasswordContainer from './components/auth/RecoverPasswordContainer';
import ResetPasswordContainer from './components/auth/ResetPasswordContainer';
import SongEditorContainer from './components/song/SongEditorContainer';
import SongListContainer from './components/song/SongListContainer';
import ProfileContainer from './components/profile/ProfileContainer';
import SongsViewContainer from './components/songsView/SongsViewContainer';
import SetlistListContainer from './components/setlist/SetlistListContainer';
import SetlistEditorContainer from './components/setlist/SetlistEditorContainer';
import SetlistViewContainer from './components/setlistView/SetlistViewContainer';

// interface
interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<any>;
  permissions: Array<string>;
}

export const routes: Array<Route> = [
  // Auth routes
  {
    key: 'login-route',
    title: 'Login',
    path: '/login',
    enabled: true,
    component: LoginContainer,
    permissions: ['noUser'],
  },
  {
    key: 'register-route',
    title: 'Register',
    path: '/register',
    enabled: true,
    component: RegisterContainer,
    permissions: ['noUser'],
  },
  {
    key: 'recover-password-route',
    title: 'Recover Password',
    path: '/password/recover',
    enabled: true,
    component: RecoverPasswordContainer,
    permissions: ['noUser'],
  },
  {
    key: 'reset-password-route',
    title: 'Reset Password',
    path: '/password/new',
    enabled: true,
    component: ResetPasswordContainer,
    permissions: ['noUser'],
  },
  // Home routes
  {
    key: 'home-route',
    title: 'Home',
    path: '/',
    enabled: true,
    component: HomeContainer,
    permissions: ['user'],
  },
  {
    key: 'profile-route',
    title: 'Profile',
    path: '/profile',
    enabled: true,
    component: ProfileContainer,
    permissions: ['user'],
  },
  // Song routes
  {
    key: 'song-route',
    title: 'Song',
    path: '/song',
    enabled: true,
    component: SongListContainer,
    permissions: ['user'],
  },
  {
    key: 'song-add-route',
    title: 'Add New Song',
    path: '/song/add',
    enabled: true,
    component: SongEditorContainer,
    permissions: ['user'],
  },
  {
    key: 'song-edit-route',
    title: 'Edit Song',
    path: '/song/edit/:id',
    enabled: true,
    component: SongEditorContainer,
    permissions: ['user'],
  },
  {
    key: 'songsView-route',
    title: 'songsView',
    path: '/song/:id',
    enabled: true,
    component: SongsViewContainer,
    permissions: ['user'],
  },
  // Setlist routes
  {
    key: 'setlist-route',
    title: 'Setlist',
    path: '/setlist',
    enabled: true,
    component: SetlistListContainer,
    permissions: ['user'],
  },
  {
    key: 'setlist-add-route',
    title: 'Add New Setlist',
    path: '/setlist/add',
    enabled: true,
    component: SetlistEditorContainer,
    permissions: ['user'],
  },  
];

export const userRoutes: Array<Route> = [  {
  key: 'setlist-view-route',
  title: 'View Setlist',
  path: '/setlist/view/:id',
  enabled: true,
  component: SetlistViewContainer,
  permissions: ['user'],
},]
