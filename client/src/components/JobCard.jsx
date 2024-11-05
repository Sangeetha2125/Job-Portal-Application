import React from 'react';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

export const JobCard = ({ job }) => {

  // Convert the date format to a more readable format (DD-MM-YYYY)
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

  const isMobile = useIsMobile();

  return (
    <Link to={`/details/${job._id}`} className='text-gray-900 bg-white flex flex-col gap-3 border border-gray-200 rounded-lg w-full py-4 px-5'>

      <div className='flex gap-5 relative'>
        {/* Company Logo */}
        <div className='flex justify-center items-center'>
          <img src={job.companyLogo.url} className='w-[4rem] h-[4rem] rounded-full object-cover' alt={job.companyName} />
        </div>
        
        {/* Job Details */}
        <div className='flex flex-col w-full'>
          <p className='font-semibold text-xl text-gray-800'>{job.title}</p>
          
          <div className='flex justify-between items-start gap-4 mt-2'>
            {/* Job Information */}
            <div className='flex flex-col gap-2 text-sm text-gray-600'>
              <p>{job.companyName}</p>
              <p>{job.exp}</p>
              {!isMobile && <p className='text-gray-500'>{job.description.slice(0, 210)}...</p>}
              <p className='text-gray-500 md:hidden'>{job.description.slice(0, 39)}...</p>
            </div>

            {/* Apply Button */}
            <div className='absolute md:right-3 right-0 top-3'>
              <button className='bg-blue-800 text-white font-semibold px-4 py-2 rounded-md'>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className='flex md:gap-8 gap-3 md:text-sm text-xs text-gray-500'>
        <span>{convertDateFormat(job.createdAt.substr(0, 10))}</span>
        <span>{job.employmentType}</span>
        <span>{job.location}</span>
      </div>
    </Link>
  );
};
