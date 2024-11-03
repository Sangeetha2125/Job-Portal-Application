import React from 'react';
import { MetaData } from '../components/MetaData';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { IoMdDownload } from "react-icons/io";
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa'; // Import the pencil icon

export const MyProfile = () => {
  const { loading, me } = useSelector(state => state.user);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const cardStyle = "bg-white p-6 m-20 rounded-lg shadow-lg relative";

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
      <div className='bg-gray-100 pt-14 md:px-20 px-3 text-gray-800 w-[70%] mx-auto'>
        {
          loading ? <Loader /> :
            <>
              <div className={cardStyle}>
                {/* Edit button inside a circle */}
                <div 
                  className='absolute top-[2rem] right-[2rem] flex justify-center items-center cursor-pointer w-8 h-8 rounded-full shadow-md text-black transition'
                  onClick={() => navigate('/editProfile')}
                  title='Edit Profile'
                >
                  <FaPencilAlt size={16} />
                </div>
                <div className='flex md:flex-row md:gap-12 flex-col gap-12 items-top md:pt-4 m-8'>
                  <div className='w-2/5 flex justify-center items-center'>
                    <img src={me.avatar.url} className='rounded-lg border-2 border-gray-200 w-full h-full' alt="Profile" />
                  </div>
                  <div className='w-full md:px-0 px-4 md:pt-4 pt-8'>
                    <div className='flex flex-col md:gap-5 gap-6'>
                      <div>
                        <p className='text-xl font-semibold'>Full Name: <span className='font-normal'>{me.name}</span></p>
                      </div>
                      <div>
                        <p className='text-xl font-semibold'>Email: <span className='font-normal'>{me.email}</span></p>
                      </div>
                      <div>
                        <p className='text-xl font-semibold'>Joined On: <span className='font-normal'>{convertDateFormat(me.createdAt.substr(0, 10))}</span></p>
                      </div>
                      <div>
                        <p className='text-xl font-semibold'>Skills:</p>
                        <div className='md:text-xl text-lg pt-3 flex gap-3'>
                          {me.skills.map((skill, i) => (
                            <span key={i} className='bg-emerald-800 text-white text-sm px-5 py-1 font-bold rounded-full'>{skill}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div onClick={open} className='pt-4 font-semibold text-blue-800 underline underline-offset-4 text-lg cursor-pointer'>View Resume</div>
                    <div className='flex flex-row gap-4 w-full pt-4'>
                      <Link to="/changePassword" className='w-full'>
                        <button className='bg-blue-800 text-white w-full px-6 py-2 rounded-md'>Change Password</button>
                      </Link>
                      <Link to="/deleteAccount" className='w-full'>
                        <button className='bg-red-800 text-white w-full px-6 py-2 rounded-md'>Delete Account</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <Modal opened={opened} onClose={close} title="Resume">
                <div>
                  <img src={me.resume.url} className='w-full h-full' alt="Resume" />
                </div>
                <a
                  href={me.resume.url}
                  download
                  className='mt-4 bg-green-800 text-white px-4 py-2 rounded-md flex items-center justify-center'
                >
                  Download Resume
                  <span className='ml-2'>
                    <IoMdDownload size={16} />
                  </span>
                </a>
              </Modal>
            </>
        }
      </div>
    </>
  );
};
