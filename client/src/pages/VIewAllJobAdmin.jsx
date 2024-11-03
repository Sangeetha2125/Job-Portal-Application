import React, { useEffect } from 'react';
import { MetaData } from '../components/MetaData';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobsAdmin, deleteJobData } from '../actions/AdminActions';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';

export const ViewAllJobAdmin = () => {
  const dispatch = useDispatch();
  const { loading, allJobs } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllJobsAdmin());
  }, [dispatch]);

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

  const deleteJobHandler = (id) => {
    dispatch(deleteJobData(id));
  };

  return (
    <>
      <MetaData title="All Jobs" />
      <div className='bg-gray-100 pt-14 md:px-20 px-3 text-gray-900 max-w-[90%] mx-auto w-full'>

        {loading ? <Loader /> : (
          <div>
            <div>
              <p className='text-center pt-12 pb-8 text-3xl font-medium'>All Jobs</p>
            </div>

            <div className="relative overflow-x-auto shadow-md bg-white">
              <table className="w-full text-sm text-left text-gray-900">
                <thead className="text-xs text-white uppercase bg-blue-800">
                  <tr>
                    <th scope="col" className="px-6 py-3">Job Id</th>
                    <th scope="col" className="px-6 py-3">Job Name</th>
                    <th scope="col" className="px-6 py-3">Company</th>
                    <th scope="col" className="px-6 py-3">Location</th>
                    <th scope="col" className="px-6 py-3">Posted On</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allJobs && allJobs.filter(job => job._id)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((job, i) => (
                      <tr key={i} className="border-b hover:bg-blue-50 bg-white border-gray-300">
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900">{job._id}</th>
                        <td className="px-6 py-4">{job.title}</td>
                        <td className="px-6 py-4">{job.companyName}</td>
                        <td className="px-6 py-4">{job.location}</td>
                        <td className="px-6 py-4">{convertDateFormat(job.createdAt.substr(0, 10))}</td>
                        <td className="px-6 flex gap-4 py-4">
                          <Link to={`/admin/job/details/${job._id}`} className='text-blue-600 hover:text-blue-500 cursor-pointer'>
                            <MdOutlineModeEditOutline size={20} />
                          </Link>
                          <span className='text-red-600 hover:text-red-500 cursor-pointer'>
                            <AiOutlineDelete onClick={() => deleteJobHandler(job._id)} size={20} />
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
