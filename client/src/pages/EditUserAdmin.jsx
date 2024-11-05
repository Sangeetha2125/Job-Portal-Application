import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { toast } from 'react-toastify';
import { getUserData, updateUser } from '../actions/AdminActions';

export const EditUserAdmin = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, userData } = useSelector(state => state.admin);
    const [role, setRole] = useState("not");

    const updateRoleHandler = () => {
        if (role === "not") {
            toast.info("Please Select Role!");
        } else {
            dispatch(updateUser(id, { role }));
            setRole("not");
        }
    };

    useEffect(() => {
        dispatch(getUserData(id));
    }, [dispatch, id]);

    return (
        <>
            <MetaData title="Edit User Role" />
            <div className='bg-gray-50 min-h-screen pt-14 md:px-20 px-3 text-gray-900'>
                {loading ? <Loader /> : (
                    <div className='flex flex-col gap-3 justify-center items-center pt-28 md:pt-20'>
                        <div className='py-4 md:w-1/3 w-full px-5 shadow-md border border-gray-300 bg-white'>
                            <div className='flex gap-3 border-b border-gray-300 pb-3 text-xl justify-center items-center'>
                                <div className='font-semibold'>Edit User Role</div>
                            </div>
                            <div className='flex gap-3 pt-3 py-2 justify-start items-center'>
                                <div>Name:</div>
                                <div>{userData.name}</div>
                            </div>
                            <div className='flex gap-3 py-2 justify-start items-center'>
                                <div>Email:</div>
                                <div>{userData.email}</div>
                            </div>
                            <div className='flex gap-3 border-b border-gray-300 py-2 pb-4 justify-start items-center'>
                                <div>Role:</div>
                                <div>{userData.role}</div>
                            </div>
                            <div className='flex gap-3 pt-4 py-2 text-sm justify-start items-center'>
                                <select 
                                    onChange={(e) => setRole(e.target.value)} 
                                    value={role}
                                    className="block w-full p-2 bg-white border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none"
                                >
                                    <option value="not">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="applicant">Applicant</option>
                                </select>
                            </div>
                            <div className='flex gap-3 font-semibold py-2 text-sm'>
                                <button 
                                    onClick={updateRoleHandler} 
                                    className='w-full rounded-md bg-blue-800 text-white py-2 transition-colors duration-200'
                                >
                                    Update Role
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
