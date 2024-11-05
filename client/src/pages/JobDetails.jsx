import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { MetaData } from '../components/MetaData'
import { Loader } from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleJob, saveJob } from '../actions/JobActions'
import { BiBriefcase, BiBuildings, BiRupee } from 'react-icons/bi'
import { AiOutlineSave } from 'react-icons/ai'
import { HiStatusOnline } from 'react-icons/hi'
import { BsPersonWorkspace, BsSend } from 'react-icons/bs'
import { TbLoader2 } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export const JobDetails = () => {

  const dispatch = useDispatch();
  const { jobDetails, loading, saveJobLoading } = useSelector(state => state.job);
  const { me, isLogin } = useSelector(state => state.user);
  const job = jobDetails;
  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getSingleJob(id))
  }, [dispatch])

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

  const saveJobHandler = () => {
    dispatch(saveJob(id));
  }

  const notLoginHandler = (str) => {
    if (!isLogin) {
      toast.info(`Please login to ${str} job`)
      navigate("/login")
    }
  }

  return (
    <>
      <MetaData title="Job Details" />
      <div className='bg-white min-h-screen pt-14 md:px-20 text-gray-800'>
        {loading ?
          <Loader />
          :
          <>
            {jobDetails && <div>
              <div className='flex pt-5 md:px-12 pl-4 md:gap-10 gap-5'>
                <div className='flex items-center w-[6rem]'>
                  <img src={jobDetails && jobDetails.companyLogo.url} className='rounded-full shadow-lg' alt="Company Logo" />
                </div>
                <div className='flex flex-col gap-2 md:pt-2'>
                  <p className='text-xl flex gap-1 items-center md:text-3xl font-semibold text-indigo-700'>
                    <BiBriefcase /> {jobDetails.title}
                  </p>
                  <p className='text-lg flex gap-1 items-center md:text-2xl text-gray-600'>
                    <BiBuildings /> {jobDetails.companyName}
                  </p>
                  <p className='text-lg flex gap-2 items-center md:text-2xl text-gray-600'>
                    <BsPersonWorkspace size={20} /> {jobDetails.employmentType}
                  </p>
                  <p className='text-lg flex gap-1.5 items-center md:text-2xl'>
                    <HiStatusOnline size={20} />
                    <span className={`w-20 text-center rounded-lg font-semibold py-1 ${jobDetails.status === "active" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-500"}`}>
                      {jobDetails.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className='border-b pt-2 pb-3 md:mx-12 mx-4'></div>
              <div className='md:px-12 pl-4'>
                <p className='text-2xl py-3 font-semibold text-gray-700'>Details:</p>
                <ul className='flex flex-col gap-3'>
                  <li className='flex items-center gap-3 text-gray-700'>
                    Posted By: <div className='font-medium'>{jobDetails.postedBy.name}</div>
                  </li>
                  <li className='flex items-center gap-3 text-gray-700'>
                    Posted At: <div>{convertDateFormat(jobDetails.createdAt.substr(0, 10))}</div>
                  </li>
                  <li className='flex items-center gap-3 text-gray-700'>
                    Location: <div>{jobDetails.location}</div>
                  </li>
                  <li className='flex items-center gap-3 text-gray-700'>
                    Salary: <div className='flex items-center'>
                      <BiRupee /> <span>{(jobDetails.salary / 100000).toFixed(0)} LPA</span>
                    </div>
                  </li>
                  <li className='flex items-center gap-3 text-gray-700'>
                    Experience: <div>{jobDetails.experience}</div>
                  </li>
                  <li className='flex items-center gap-3 text-gray-700'>
                    Skills Required: 
                    <div className='flex flex-wrap items-center gap-3'>
                      {jobDetails.skillsRequired.map((e, i) => (
                        <span key={i} className='px-3 py-1 bg-yellow-300 rounded text-black text-sm font-semibold'>{e}</span>
                      ))}
                    </div>
                  </li>
                  <li className='grid gap-2 pt-2'>
                    <div className='text-2xl font-semibold text-gray-700'>Job Description:</div>
                    <div>{jobDetails.description}</div>
                  </li>
                </ul>
              </div>

              <div className='md:px-12 pl-4 flex gap-8 pb-32 pt-6'>
                <button
                  onClick={() => {
                    isLogin ?
                      me.appliedJobs && me.appliedJobs.includes(jobDetails._id) ? toast.error("You have already applied!") :
                        navigate(`/Application/${jobDetails._id}`)
                      :
                      notLoginHandler("apply")
                  }}
                  className='hover:bg-green-600 text-sm font-bold px-10 py-2 bg-green-700 text-white flex items-center gap-2 rounded-md transition-all duration-200'>
                  <BsSend /> {me.appliedJobs && me.appliedJobs.includes(jobDetails._id) ? "Applied" : "Apply"}
                </button>

                <button
                  onClick={() => {
                    if (isLogin) {
                      saveJobHandler();
                    } else {
                      notLoginHandler("save");
                    }
                  }}
                  className='hover:bg-blue-600 text-sm font-bold px-10 py-2 bg-blue-700 text-white flex items-center gap-2 rounded-md transition-all duration-200'>
                  {saveJobLoading ? <span className='animate-spin px-3'><TbLoader2 size={20} /></span> :
                    <>
                      <AiOutlineSave />
                      {me.savedJobs && me.savedJobs.includes(jobDetails._id) ? "UnSave" : "Save"}
                    </>
                  }
                </button>
              </div>
            </div>}
          </>
        }
      </div>
    </>
  )
}
