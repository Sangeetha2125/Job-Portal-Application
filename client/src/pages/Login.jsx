import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { AiOutlineMail, AiOutlineUnlock, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { TbLoader2 } from 'react-icons/tb';
import { loginUser } from '../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';

export const Login = () => {
  const { loading, isLogin } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyeTog, setEyeTog] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(loginUser(data));
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <>
      <MetaData title="Login" />
      <div className='bg-gray-100 pt-14 md:px-20 px-3'>
        <div className='flex justify-center w-full items-start pt-14'>
          <form onSubmit={loginHandler} className='flex flex-col md:w-1/3 w-full mx-8 shadow-lg rounded-lg bg-white p-6'>
            <div className='text-center mb-6'>
              <p className='text-2xl font-medium'>Login to your account</p>
            </div>
            <div className='flex items-center mb-4 border border-gray-300 rounded-md'>
              <div className='text-gray-600 px-3'>
                <AiOutlineMail size={20} />
              </div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder='Email'
                type="text"
                className='outline-none w-full text-gray-800 px-2 py-2'
              />
            </div>
            <div className='flex items-center mb-4 border border-gray-300 rounded-md'>
              <div className='text-gray-600 px-3'>
                <AiOutlineUnlock size={20} />
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder='Password'
                type={eyeTog ? "text" : "password"}
                className='outline-none w-full text-gray-800 px-2 py-2'
              />
              <div className='text-gray-600 px-3 cursor-pointer'>
                {eyeTog ? (
                  <AiOutlineEye size={20} onClick={() => setEyeTog(!eyeTog)} />
                ) : (
                  <AiOutlineEyeInvisible size={20} onClick={() => setEyeTog(!eyeTog)} />
                )}
              </div>
            </div>
            <div>
              <button
                disabled={loading || !email || !password}
                className='bg-blue-800 text-white px-8 w-full py-2 rounded-md hover:bg-blue-700 transition duration-200 flex justify-center items-center font-semibold'
              >
                {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Login"}
              </button>
            </div>
            <div className='text-center text-sm pt-4'>
              <p>
                Don't have an account? <Link to="/register" className='text-blue-600 underline'>Register here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
