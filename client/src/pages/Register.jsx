import React, { useState, useEffect } from 'react';
import { MetaData } from '../components/MetaData';
import { AiOutlineMail, AiOutlineUnlock, AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { MdPermIdentity, MdOutlineFeaturedPlayList } from 'react-icons/md';
import { BsFileEarmarkText } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { Link, useNavigate } from 'react-router-dom';
import { TbLoader2 } from 'react-icons/tb';
import { registerUser } from '../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';

export const Register = () => {
  const { loading, isLogin } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [eyeTog, setEyeTog] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarName, setAvatarName] = useState("");
  const [resume, setResume] = useState("");
  const [resumeName, setResumeName] = useState("");

  const avatarChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarName(e.target.files[0].name);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const resumeChange = (e) => {
    if (e.target.name === "resume") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setResume(reader.result);
          setResumeName(e.target.files[0].name);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const registerHandler = (e) => {
    e.preventDefault();
    const skillsArr = skills.split(",");
    const data = { name, email, password, avatar, resume, skills: skillsArr };
    dispatch(registerUser(data));
    setName("");
    setEmail("");
    setPassword("");
    setAvatar("");
    setAvatarName("");
    setResume("");
    setResumeName("");
    setSkills("");
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <>
      <MetaData title="Register" />
      <div className='bg-gray-100 pt-20 md:px-20 px-3'>
        <div className='flex justify-center w-full items-start pt-6'>
          <form onSubmit={registerHandler} className='flex flex-col md:w-1/3 w-full mx-8 shadow-lg rounded-lg bg-white p-6'>
            <div className='text-center mb-4'>
              <p className='text-2xl font-medium'>Create your account</p>
            </div>
            <div className='flex items-center mb-4 border border-gray-300 rounded-md'>
              <div className='text-gray-600 px-3'>
                <MdPermIdentity size={20} />
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='Full name'
                type="text"
                className='outline-none w-full text-gray-800 px-2 py-2'
              />
            </div>
            <div className='flex items-center mb-4 border border-gray-300 rounded-md'>
              <div className='text-gray-600 px-3'>
                <AiOutlineMail size={20} />
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email'
                type="email"
                className='outline-none w-full text-gray-800 px-2 py-2'
              />
            </div>
            <div className='flex items-center mb-4 border border-gray-300 rounded-md'>
              <div className='text-gray-600 px-3'>
                <AiOutlineUnlock size={20} />
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className='flex items-center mb-4 border border-gray-300 rounded-md'>
              <div className='text-gray-600 px-3'>
                {avatar.length === 0 ? <CgProfile size={20} /> : <img src={avatar} className='w-[3em] h-[2.5em]' alt="avatar preview" />}
              </div>
              <label htmlFor='avatar' className='w-full cursor-pointer text-gray-800 px-2 py-2'>
                {avatarName.length === 0 ? <span className='text-gray-500'>Select Profile Pic...</span> : avatarName}
              </label>
              <input
                id='avatar'
                name='avatar'
                required
                onChange={avatarChange}
                placeholder='Profile'
                accept="image/*"
                type="file"
                className='hidden'
              />
            </div>
            <div className='flex items-center mb-4 border border-gray-300 rounded-md'>
              <div className='text-gray-600 px-3'>
                <BsFileEarmarkText size={20} />
              </div>
              <label className='w-full text-gray-800 px-2 py-2' htmlFor="resume">
                {resumeName.length === 0 ? <span className='text-gray-500 cursor-pointer'>Select Resume...</span> : resumeName}
              </label>
              <input
                required
                onChange={resumeChange}
                placeholder='Resume'
                id='resume'
                name='resume'
                accept=".pdf, .doc, .docx"
                type="file"
                className='hidden'
              />
            </div>
            <div className='flex items-center mb-4 border border-gray-300 rounded-md'>
              <div className='text-gray-600 px-3'>
                <MdOutlineFeaturedPlayList size={20} />
              </div>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder='Skills (comma-separated)'
                className='outline-none w-full text-gray-800 px-2 py-2'
              />
            </div>
            <div>
              <button disabled={loading} className='bg-blue-800 text-white flex justify-center items-center px-8 w-full py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold'>
                {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Register"}
              </button>
            </div>
            <div className='text-center text-sm pt-4'>
              <p>
                Already have an account? <Link to="/login" className='text-blue-600 underline'>Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
