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

  const postMedia = async (file, inputs, token) => {
    const mediaObject = {
      title: inputs.title,
      description: inputs.description,
      filename: file.data.filename,
      media_type: file.data.media_type,
      filesize: file.data.filesize,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(mediaObject),
    };
    const result = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media',
      fetchOptions
    );
    return result;
  };

  const deleteMedia = async (media_id, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media/' + media_id,
      fetchOptions
    );
  };

  const modifyMedia = async (media_id, inputs, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media/' + media_id,
      fetchOptions
    );
  };

  useEffect(() => {
    getMedia();
  }, []);

  return { mediaArray, postMedia, deleteMedia, modifyMedia };
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

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };
    const result = await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions
    );
    return result;
  };

  return { postFile };
};

const useLike = () => {
  const postLike = async (media_id, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ media_id }),
    };
    return await fetchData(import.meta.env.VITE_MEDIA_API + '/likes', fetchOptions);
  };

  const deleteLike = async (like_id, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/likes/' + like_id,
      fetchOptions
    );
  };

  const getLikeCountByMediaId = async (media_id) => {
    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/likes/count/' + media_id
    );
  };

  const getLikesByMedia = async (media_id) => {
    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/likes/bymedia/' + media_id
    );
  };

  return { postLike, deleteLike, getLikeCountByMediaId, getLikesByMedia };
};

export { useMedia, useAuthentication, useUser, useFile, useLike };
