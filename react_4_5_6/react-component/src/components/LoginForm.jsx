import useForm from '../hooks/formHooks';
import { useUserContext } from '../hooks/contextHooks';

const LoginForm = () => {
  const { handleLogin } = useUserContext();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      await handleLogin(inputs);
    } catch (e) {
      alert(e.message);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doLogin, initValues);

  return (
    <>
      <h1>Login</h1>
      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        <div className="flex flex-col w-4/5">
          <label htmlFor="loginuser">Username</label>
          <input
            className="my-2.5 p-2.5 border border-[#ccc] rounded bg-[#1a1a1a] text-white"
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col w-4/5">
          <label htmlFor="loginpassword">Password</label>
          <input
            className="my-2.5 p-2.5 border border-[#ccc] rounded bg-[#1a1a1a] text-white"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button
          className="my-2.5 px-4 py-2 rounded bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111]"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
