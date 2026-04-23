import { useUserContext } from '../hooks/contextHooks';

const Profile = () => {
  const { user } = useUserContext();

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>User ID: {user.user_id}</p>
        </>
      )}
    </div>
  );
};

export default Profile;
