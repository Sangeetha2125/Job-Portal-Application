import React, { useState, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { MetaData } from '../components/MetaData';
import { AiOutlineMail } from 'react-icons/ai';
import { MdPermIdentity, MdOutlineFeaturedPlayList } from 'react-icons/md';
import { BsFileEarmarkText } from 'react-icons/bs';
import { updateProfile, me as ME } from '../actions/UserActions';
import { CgProfile } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';

export const EditProfile = () => {
    const dispatch = useDispatch();
    const { loading, me } = useSelector(state => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
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

    const editHandler = (e) => {
        e.preventDefault();
        const skillArr = Array.isArray(skills) ? skills : skills.split(",");

        const data = {
            newName: name,
            newEmail: email,
            newAvatar: avatar,
            newResume: resume,
            newSkills: skillArr
        };

        dispatch(updateProfile(data));
    };

    useEffect(() => {
        if (!me || !me.name) {
            dispatch(ME());
        } else {
            setName(me.name);
            setEmail(me.email);
            setSkills(me.skills.join(", ")); 
        }
    }, [dispatch, me]);

    return (
        <>
            <MetaData title="Edit Profile" />
            <div className='bg-gray-100 pt-20 md:px-20 px-3'>
                {loading ? <Loader /> :
                    <div className='flex justify-center w-full items-start pt-6'>
                        <form onSubmit={editHandler} className='flex flex-col md:w-1/3 w-full mx-8 shadow-lg rounded-lg bg-white p-6'>
                            <div className='text-center mb-4'>
                                <p className='text-2xl font-medium'>Edit Profile</p>
                            </div>
                            {/* Name */}
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
                            {/* Mail */}
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
                            {/* Profile */}
                            <div className='flex items-center mb-4 border border-gray-300 rounded-md'>
                                <div className='text-gray-600 px-3'>
                                    {avatar.length === 0 ? <CgProfile size={20} /> : <img src={avatar} className='w-[3em] h-[2.5em]' alt="avatar preview" />}
                                </div>
                                <label htmlFor='avatar' className='w-full cursor-pointer text-gray-800 px-2 py-2'>
                                    {avatarName.length === 0 ? <span className='text-gray-500'>Select New Profile Pic...</span> : avatarName}
                                </label>
                                <input 
                                    id='avatar' 
                                    name='avatar' 
                                    required
                                    onChange={avatarChange}
                                    accept="image/*" 
                                    type="file" 
                                    className='hidden' 
                                />
                            </div>
                            {/* Resume */}
                            <div className='flex items-center mb-4 border border-gray-300 rounded-md'>
                                <div className='text-gray-600 px-3'>
                                    <BsFileEarmarkText size={20} />
                                </div>
                                <label className='w-full text-gray-800 px-2 py-2' htmlFor="resume">
                                    {resumeName.length === 0 ? <span className='text-gray-500 cursor-pointer'>Select New Resume...</span> : resumeName}
                                </label>
                                <input 
                                    required
                                    onChange={resumeChange}
                                    id='resume' 
                                    name='resume' 
                                    accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                                    type="file" 
                                    className='hidden' 
                                />
                            </div>
                            {/* Skills */}
                            <div className='flex items-start mb-4 border border-gray-300 rounded-md'>
                                <div className='text-gray-600 px-3 pt-3'>
                                    <MdOutlineFeaturedPlayList size={20} />
                                </div>
                                <textarea 
                                    value={skills} 
                                    onChange={(e) => setSkills(e.target.value)} 
                                    placeholder='Skills (comma separated)' 
                                    className='outline-none w-full text-gray-800 px-2 py-2' 
                                />
                            </div>
                            <div>
                                <button className='bg-blue-800 text-white flex justify-center items-center px-8 w-full py-2 rounded-md font-semibold'>
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </>
    );
};
