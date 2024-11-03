import React, { useState } from 'react';
import { MetaData } from '../components/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUnlock, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { MdOutlineVpnKey } from 'react-icons/md';
import { TbLoader2 } from 'react-icons/tb';
import { changePass } from '../actions/UserActions';

export const ChangePassword = () => {
    const { loading } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [eyeTog1, setEyeTog1] = useState(false);
    const [eyeTog2, setEyeTog2] = useState(false);
    const [eyeTog3, setEyeTog3] = useState(false);

    const changeHandler = (e) => {
        e.preventDefault();
        const data = { oldPassword, newPassword, confirmPassword };
        dispatch(changePass(data));

        if (!loading) {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <>
            <MetaData title="Change Password" />
            <div className='bg-gray-100 pt-14 flex justify-center'>
                <div className='flex justify-center w-full items-start pt-14'>
                    <form onSubmit={changeHandler} className='flex flex-col md:w-1/3 w-full md:mx-0 mx-4'>
                        <div className='md:px-10 shadow-md border border-gray-300 bg-white p-6 w-full flex flex-col gap-4 rounded-lg'>
                            <div className='text-center mb-4'>
                                <p className='text-2xl font-medium'>Change Password</p>
                            </div>
                            <div className='flex items-center border border-gray-300 rounded-md'>
                                <div className='text-gray-600 px-2'>
                                    <MdOutlineVpnKey size={20} />
                                </div>
                                <input
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                    placeholder='Old Password'
                                    type={eyeTog1 ? "text" : "password"}
                                    className='outline-none w-full text-gray-800 px-1 pr-3 py-2'
                                />
                                <div className='text-gray-600 px-2 cursor-pointer'>
                                    {eyeTog1 ?
                                        <AiOutlineEye size={20} onClick={() => setEyeTog1(!eyeTog1)} /> :
                                        <AiOutlineEyeInvisible size={20} onClick={() => setEyeTog1(!eyeTog1)} />
                                    }
                                </div>
                            </div>
                            <div className='flex items-center border border-gray-300 rounded-md'>
                                <div className='text-gray-600 px-2'>
                                    <AiOutlineUnlock size={20} />
                                </div>
                                <input
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder='New Password'
                                    type={eyeTog2 ? "text" : "password"}
                                    className='outline-none w-full text-gray-800 px-1 pr-3 py-2'
                                />
                                <div className='text-gray-600 px-2 cursor-pointer'>
                                    {eyeTog2 ?
                                        <AiOutlineEye size={20} onClick={() => setEyeTog2(!eyeTog2)} /> :
                                        <AiOutlineEyeInvisible size={20} onClick={() => setEyeTog2(!eyeTog2)} />
                                    }
                                </div>
                            </div>
                            <div className='flex items-center border border-gray-300 rounded-md'>
                                <div className='text-gray-600 px-2'>
                                    <AiOutlineLock size={20} />
                                </div>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder='Confirm Password'
                                    type={eyeTog3 ? "text" : "password"}
                                    className='outline-none w-full text-gray-800 px-1 pr-3 py-2'
                                />
                                <div className='text-gray-600 px-2 cursor-pointer'>
                                    {eyeTog3 ?
                                        <AiOutlineEye size={20} onClick={() => setEyeTog3(!eyeTog3)} /> :
                                        <AiOutlineEyeInvisible size={20} onClick={() => setEyeTog3(!eyeTog3)} />
                                    }
                                </div>
                            </div>
                            <div>
                                <button
                                    disabled={loading}
                                    className='bg-blue-800 text-white px-8 w-full py-2 rounded-md transition duration-200 flex justify-center items-center font-semibold mt-3 cursor-pointer'
                                >
                                    {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Change Password"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
