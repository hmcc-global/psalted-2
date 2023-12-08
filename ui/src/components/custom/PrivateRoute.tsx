import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { updateAxiosClient } from './customAxios';

import HomeContainer from '../home/HomeContainer';
import LoginContainer from '../auth/LoginContainer';
import ErrorPage from './ErrorPage';

const PrivateRoute = ({ component: Component, permissions, ...rest }: any) => {
  const user = useSelector((state: any) => state.user);
  const [userObj, setUserObj] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkIfTokenExists = async (toVerify: any) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/auth/verify-token', {
        token: toVerify,
      });
      setIsLoading(false);
      updateAxiosClient(toVerify);
      return data;
    } catch (err: any) {
      if (err.response.data.raw === 'token-expired') {
        localStorage.clear();
        window.location.reload();
      }
      setIsLoading(false);
      return {};
    }
  };

  useEffect(() => {
    // useEffects are meant to be synchronous, this helps to remove the warning
    async function fetch() {
      let obj = await checkIfTokenExists(user);
      setUserObj(obj);
    }

    fetch();
  }, [user]);

  // check if Token exists in redux store
  const noTokenExists = Object.keys(user).length === 0;
  const noUser = permissions.includes('noUser');
  const isPublic = permissions.includes('public');
  const access = isPublic;
  // TODO: When accessType is implemented, uncomment this
  //   const access = isPublic || permissions.some(
  //   (p: any) => userObj != null && Object.keys(userObj).length !== 0 && p === userObj.accessType
  // );

  return (
    !isLoading &&
    userObj != null && (
      <Route
        {...rest}
        render={(props: any) => {
          // if page is public
          if (noUser) {
            // if user is not logged in, render component
            if (noTokenExists) return <Component {...props} />;
            // if user is logged in, redirect to home page with user object
            else {
              props.history.push('/');
              return <HomeContainer {...props} user={userObj} />;
            }
          } else if (access) {
            // if user is not logged in, redirect to login page
            if (noTokenExists) {
              props.history.push('/login');
              return <LoginContainer {...props} />;
            }
            // if user is logged in, render component
            return <Component {...props} user={userObj} />;
          } else {
            return <ErrorPage {...props} user={userObj} />;
          }
        }}
      />
    )
  );
};

export default PrivateRoute;
