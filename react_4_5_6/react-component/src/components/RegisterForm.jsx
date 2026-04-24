import useForm from '../hooks/formHooks';
import { useUser } from '../hooks/apiHooks';

const RegisterForm = () => {
  const { postUser } = useUser();

  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      await postUser(inputs);
      alert('Registration successful! You can now login.');
    } catch (e) {
      alert(e.message);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doRegister, initValues);

  return (
    <>
      <h1>Register</h1>
      <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        <div className="flex flex-col w-4/5">
          <label htmlFor="registeruser">Username</label>
          <input
            className="my-2.5 p-2.5 border border-[#ccc] rounded bg-[#1a1a1a] text-white"
            name="username"
            type="text"
            id="registeruser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col w-4/5">
          <label htmlFor="registeremail">Email</label>
          <input
            className="my-2.5 p-2.5 border border-[#ccc] rounded bg-[#1a1a1a] text-white"
            name="email"
            type="email"
            id="registeremail"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col w-4/5">
          <label htmlFor="registerpassword">Password</label>
          <input
            className="my-2.5 p-2.5 border border-[#ccc] rounded bg-[#1a1a1a] text-white"
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </div>
        <button
          className="my-2.5 px-4 py-2 rounded bg-[#363636] text-white border-none cursor-pointer hover:bg-[#111111]"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
