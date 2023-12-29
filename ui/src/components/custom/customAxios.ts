import axios, { AxiosInstance } from 'axios';

export let customAxios: AxiosInstance;

export let updateAxiosClient = (token?: string) => {
  customAxios = axios.create({
    headers: { Authorization: 'Bearer ' + token },
  });

  customAxios.interceptors.response.use(
    (response) => response,
    (err: any) => Promise.reject(err)
  );
};

updateAxiosClient();
