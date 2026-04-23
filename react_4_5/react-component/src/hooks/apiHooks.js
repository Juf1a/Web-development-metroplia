import { useState, useEffect } from 'react';
import fetchData from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
      const newArray = await Promise.all(
        json.map(async (item) => {
          const result = await fetchData(import.meta.env.VITE_AUTH_API + '/users/' + item.user_id);
          return { ...item, username: result.username };
        })
      );
      setMediaArray(newArray);
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return { mediaArray };
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions
    );
    return loginResult;
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions
    );
    return userResult;
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions
    );
    return userResult;
  };

  return { getUserByToken, postUser };
};

export { useMedia, useAuthentication, useUser };
