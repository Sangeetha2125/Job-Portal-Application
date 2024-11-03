import React, { useEffect, useState } from 'react'
import { MetaData } from '../components/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobsAdmin, getAllUsersAdmin, getAllAppAdmin } from '../actions/AdminActions'
import CountUp from 'react-countup';
import { BarChart } from '../components/Chart'
import { Loader } from '../components/Loader'

export const Dashboard = () => {

  const dispatch = useDispatch();

  const { loading, allJobs, allApplications, allUsers } = useSelector(state => state.admin);


  useEffect(() => {
    dispatch(getAllJobsAdmin());
    dispatch(getAllUsersAdmin());
    dispatch(getAllAppAdmin());
  }, []);

  return (
    <>

      <MetaData title="Dashboard" />
      <div className='bg-gray-950 min-h-screen pt-14  md:px-20 px-3  text-white'>
        <div className='w-full'>
          {loading ?
            <Loader />
            :
            <>
              <div className=' pt-8 flex justify-center items-center  text-4xl'>
                <p className='pb-3 border-b border-gray-600 text-center font-medium w-1/2'>Dashboard</p>
              </div>

              <div className='grid md:grid-cols-3 grid-cols-1 md:gap-0 gap-16 md:pt-28 pt-16 pb-28'>

                <div className='flex  flex-col gap-3  justify-center items-center '>
                  <div className='text-8xl '> <CountUp start={0} end={allUsers && allUsers.length} /></div>
                  <p className='text-2xl '>Users</p>
                </div>
                <div className='flex flex-col gap-3  justify-center items-center '>
                  <div className='text-8xl '> <CountUp start={0} end={allJobs && allJobs.length} /></div>
                  <p className='text-2xl'>Jobs</p>
                </div>
                <div className='flex flex-col gap-3  justify-center items-center '>
                  <div className='text-8xl '><CountUp start={0} end={allApplications && allApplications.length} /></div>
                  <p className='text-2xl'>Applications</p>
                </div>
              </div>
              <div className='w-full  flex justify-center items-center pb-28'>
                <div className='w-[27rem] md:px-0 px-6 h-[27rem]'>

                  <BarChart applications={allApplications && allApplications.length} users={allUsers && allUsers.length} jobs={allJobs && allJobs.length} />
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </>
  )
}
