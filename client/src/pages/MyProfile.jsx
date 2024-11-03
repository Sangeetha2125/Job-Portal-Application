import React from 'react';
import { MetaData } from '../components/MetaData';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';

export const MyProfile = () => {
  const { loading, me, isLogin } = useSelector(state => state.user);
  const [opened, { open, close }] = useDisclosure(false);

  const convertDateFormat = (inputDate) => {
    const parts = inputDate.split('-');
    if (parts.length !== 3) {
      return "Invalid date format";
    }
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <MetaData title="My Profile" />
      <div className='bg-gray-100 pt-14 md:px-20 px-3 text-gray-800'>
        {
          loading ? <Loader /> :
            <>
              <div className='text-left text-3xl underline pl-4 md:pt-6 pt-3'>
                <span className='font-medium'>My Profile</span>
              </div>

              <div className='flex md:flex-row md:gap-12 flex-col md:justify-around justify-center items-top md:pt-12 min-h-[90vh]'>
                <div className='md:w-1/2 w-full pt-16 md:pt-10 flex flex-col justify-start items-center'>
                  <div className='w-72 h-72 flex justify-center items-center'>
                    <img src={me.avatar.url} className='rounded-full w-full h-full' alt="Profile" />
                  </div>
                  <div className='flex justify-center items-center'>
                    <Link to="/editProfile" className='bg-blue-500 text-white px-10 py-2 font-semibold rounded-md hover:bg-blue-600 transition duration-200'>Edit Profile</Link>
                  </div>
                </div>
                <div className='md:w-1/2 w-full md:px-0 px-4 pb-20 md:pt-4 pt-8'>
                  <div className='flex flex-col md:gap-5 gap-6'>
                    <div>
                      <p className='md:text-2xl text-xl'>Full Name</p>
                      <p className='md:text-xl pt-1 text-lg'>{me.name}</p>
                    </div>
                    <div>
                      <p className='md:text-2xl text-xl'>Email</p>
                      <p className='md:text-xl pt-1 text-lg'>{me.email}</p>
                    </div>
                    <div>
                      <p className='md:text-2xl text-xl'>Joined On</p>
                      <p className='md:text-xl pt-1 text-lg'>{convertDateFormat(me.createdAt.substr(0, 10))}</p>
                    </div>
                    <div>
                      <p className='md:text-2xl text-xl'>Skills</p>
                      <div className='md:text-xl text-lg pt-3 flex gap-3'>
                        {me.skills.map((skill, i) => (
                          <span key={i} className='bg-yellow-500 text-black text-sm px-2 py-1 font-bold rounded-md'>{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className='flex md:flex-row flex-col md:gap-8 pt-4 gap-3'>
                      <ul className='flex flex-col gap-4'>
                        <li>
                          <button onClick={open} className='bg-blue-500 text-white w-2/3 md:w-full font-medium px-6 py-1 rounded-md hover:bg-blue-600 transition duration-200'>My Resume</button>
                        </li>
                        <li>
                          <Link to="/applied"><button className='bg-blue-500 text-white w-2/3 md:w-full font-medium px-6 py-1 rounded-md hover:bg-blue-600 transition duration-200'>My Applications</button></Link>
                        </li>
                        <li>
                          <Link to="/saved"><button className='bg-blue-500 text-white w-2/3 md:w-full font-medium px-6 py-1 rounded-md hover:bg-blue-600 transition duration-200'>Saved Jobs</button></Link>
                        </li>
                      </ul>
                      <ul className='flex flex-col gap-4'>
                        <li>
                          <Link to="/changePassword"><button className='bg-blue-500 text-white w-2/3 md:w-full font-medium px-6 py-1 rounded-md hover:bg-blue-600 transition duration-200'>Change Password</button></Link>
                        </li>
                        <li>
                          <Link to="/deleteAccount"><button className='bg-blue-500 text-white w-2/3 md:w-full font-medium px-6 py-1 rounded-md hover:bg-blue-600 transition duration-200'>Delete Account</button></Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Modal opened={opened} onClose={close} title="Resume">
                  <div>
                    <img src={me.resume.url} className='w-full h-full' alt="Resume" />
                  </div>
                </Modal>
              </div>
            </>
        }
      </div>
    </>
  );
};
