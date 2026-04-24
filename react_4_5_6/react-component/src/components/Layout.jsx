import { useEffect } from 'react';
import { Link, Outlet } from 'react-router';
import { useUserContext } from '../hooks/contextHooks';

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div>
      <nav>
        <ul className="flex justify-end list-none m-0 p-0 overflow-hidden bg-[#333333]">
          <li>
            <Link className="block text-white text-center p-4 no-underline hover:bg-[#111111]" to="/">Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link className="block text-white text-center p-4 no-underline hover:bg-[#111111]" to="/profile">Profile</Link>
              </li>
              <li>
                <Link className="block text-white text-center p-4 no-underline hover:bg-[#111111]" to="/upload">Upload</Link>
              </li>
              <li>
                <Link className="block text-white text-center p-4 no-underline hover:bg-[#111111]" to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <li>
              <Link className="block text-white text-center p-4 no-underline hover:bg-[#111111]" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
