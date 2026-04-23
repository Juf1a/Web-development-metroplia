import { useState, useEffect } from 'react';
import { useUser } from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { getUserByToken } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const result = await getUserByToken(token);
          setUser(result.user);
        } catch (e) {
          console.log(e.message);
        }
      };
      fetchUser();
    }
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>User ID: {user.user_id}</p>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
};

export default Profile;
