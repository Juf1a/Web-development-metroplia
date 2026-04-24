import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      {showRegister ? <RegisterForm /> : <LoginForm />}
      <button
        className="my-2.5 px-4 py-2 rounded bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111]"
        onClick={() => setShowRegister(!showRegister)}
      >
        {showRegister ? 'Back to Login' : 'Create an account'}
      </button>
    </>
  );
};

export default Login;
