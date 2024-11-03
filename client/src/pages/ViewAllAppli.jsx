import React, { useEffect } from 'react';
import { MetaData } from '../components/MetaData';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { getAllAppAdmin, deleteApp } from '../actions/AdminActions';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { Link } from 'react-router-dom';

export const ViewAllAppli = () => {
  const dispatch = useDispatch();
  const { loading, allApplications } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllAppAdmin());
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

  const deleteApplication = (id) => {
    dispatch(deleteApp(id));
  };

  return (
    <>
      <MetaData title="All Applications" />
      <div className='bg-gray-100 pt-14 md:px-20 px-3 text-gray-900 max-w-[90%] mx-auto w-full'>

        {loading ? <Loader /> : (
          <div>
            <div>
              <p className='text-center pt-12 pb-8 text-3xl font-medium'>All Applications</p>
            </div>

            <div className="relative overflow-x-auto shadow-md bg-white">

              <table className="w-full text-sm text-left text-gray-900">
                <thead className="text-xs text-white uppercase bg-blue-800">
                  <tr>
                    <th scope="col" className="px-6 py-3">Application Id</th>
                    <th scope="col" className="px-6 py-3">Job Name</th>
                    <th scope="col" className="px-6 py-3">Applicant</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Created On</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allApplications && allApplications.filter(app => app._id)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((app, i) => (
                      <tr key={i} className="border-b hover:bg-blue-50 bg-white border-gray-300">
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900">{app._id}</th>
                        <td className="px-6 py-4">{app.job.title}</td>
                        <td className="px-6 py-4">{app.applicant.name}</td>
                        <td className={`px-6 py-4 ${
                          app.status === "pending" ? "text-blue-600" : app.status === "rejected" ? "text-red-600" : "text-green-600"
                        }`}>
                          {app.status}
                        </td>
                        <td className="px-6 py-4">{convertDateFormat(app.createdAt.substr(0, 10))}</td>
                        <td className="px-6 flex gap-4 py-4">
                          <Link to={`/admin/update/application/${app._id}`} className='text-blue-600 hover:text-blue-500 cursor-pointer'>
                            <MdOutlineModeEditOutline size={20} />
                          </Link>
                          <div className='text-red-600 hover:text-red-500 cursor-pointer'>
                            <AiOutlineDelete onClick={() => deleteApplication(app._id)} size={20} />
                          </div>
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
