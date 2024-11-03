import React, { useEffect } from 'react';
import { MetaData } from '../components/MetaData';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { getAllUsersAdmin, deleteUser } from '../actions/AdminActions';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';

export const ViewAllUsersAdmin = () => {
  const dispatch = useDispatch();
  const { loading, allUsers } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getAllUsersAdmin());
  }, [dispatch]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const convertDateFormat = (inputDate) => {
    const parts = inputDate.split('-');
    if (parts.length !== 3) {
      return "Invalid date format";
    }
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <MetaData title="All Users" />
      <div className='bg-gray-100 pt-14 md:px-20 px-3 text-gray-900 max-w-[90%] mx-auto w-full'>

        {loading ? <Loader /> : (
          <div>
            <div>
              <p className='text-center pt-12 pb-8 text-3xl font-medium'>All Users</p>
            </div>

            <div className="relative overflow-x-auto shadow-md bg-white">

              <table className="w-full text-sm text-left text-gray-900">
                <thead className="text-xs text-white uppercase bg-blue-800">
                  <tr>
                    <th scope="col" className="px-6 py-3">User Id</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Role</th>
                    <th scope="col" className="px-6 py-3">Created On</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers && allUsers.filter(user => user._id)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((user, i) => (
                      <tr key={i} className="border-b hover:bg-blue-50 bg-white border-gray-300">
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900">{user._id}</th>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.role}</td>
                        <td className="px-6 py-4">{convertDateFormat(user.createdAt.substr(0, 10))}</td>
                        <td className="px-6 flex gap-4 py-4">
                          <Link to={`/admin/user/role/${user._id}`} className='text-blue-600 hover:text-blue-500 cursor-pointer flex justify-center items-center'>
                            <MdOutlineModeEditOutline size={20} />
                          </Link>
                          <span onClick={() => deleteUserHandler(user._id)} className='text-red-600 hover:text-red-500 cursor-pointer flex justify-center items-center'>
                            <AiOutlineDelete size={20} />
                          </span>
                        </td>
                      </tr>))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
