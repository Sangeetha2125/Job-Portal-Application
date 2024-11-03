import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUnlock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { TbLoader2 } from 'react-icons/tb';
import { deleteAccount } from '../actions/UserActions';
import { Checkbox } from '@mantine/core';
import { useNavigate } from 'react-router';

export const DeleteAccount = () => {
    const { loading, isLogin } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [eyeTog, setEyeTog] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState(false);

    const navigate = useNavigate();

    const deleteHandler = (e) => {
        e.preventDefault();
        const data = { password };
        dispatch(deleteAccount(data));
        setPassword("");
    }

    useEffect(() => {
        if (!isLogin) {
            navigate("/");
        }
    }, [isLogin]);

    return (
        <>
            <MetaData title="Delete Account" />
            <div className='bg-gray-100 min-h-screen pt-14 flex justify-center'>
                <div className='flex justify-center w-full items-start pt-14'>
                    <form onSubmit={deleteHandler} className='flex flex-col md:w-1/3 w-full mx-4'>
                        <div className='md:px-10 px-6 py-6 shadow-md border border-gray-300 bg-white w-full flex flex-col gap-4 rounded-lg'>
                            <div className='text-center mb-4'>
                                <p className='text-2xl font-medium'>Delete Account</p>
                            </div>
                            <div className='flex items-center border border-gray-300 rounded-md'>
                                <div className='text-gray-600 px-2'>
                                    <AiOutlineUnlock size={20} />
                                </div>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder='Enter Password'
                                    type={eyeTog ? "text" : "password"}
                                    className='outline-none w-full text-gray-800 px-1 pr-3 py-2'
                                />
                                <div className='text-gray-600 px-2 cursor-pointer'>
                                    {eyeTog ?
                                        <AiOutlineEye size={20} onClick={() => setEyeTog(!eyeTog)} /> :
                                        <AiOutlineEyeInvisible size={20} onClick={() => setEyeTog(!eyeTog)} />
                                    }
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Checkbox className='cursor-pointer' checked={confirm} onChange={() => setConfirm(!confirm)} />
                                <span className='text-gray-800'>Are you sure you want to delete your account?</span>
                            </div>
                            <div>
                                <button
                                    disabled={loading || !confirm}
                                    className='bg-blue-800 text-white px-8 w-full py-2 rounded-md transition duration-200 flex justify-center items-center font-semibold mt-3 cursor-pointer'
                                >
                                    {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Delete Account"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
