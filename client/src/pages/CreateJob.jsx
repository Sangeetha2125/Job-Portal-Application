import React, { useState } from 'react';
import { MetaData } from '../components/MetaData';
import { MdOutlineLocationOn, MdOutlineFeaturedPlayList, MdOutlineWorkOutline, MdWorkspacesOutline, MdAttachMoney, MdOutlineReceiptLong } from 'react-icons/md';
import { BiImageAlt, BiBuilding } from 'react-icons/bi';
import { TbLoader2 } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { createJobPost } from '../actions/JobActions';
import { RxCross1 } from 'react-icons/rx';

export const CreateJob = () => {
  const { loading } = useSelector(state => state.job);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [category, setCategory] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [logo, setLogo] = useState("");
  const [logoName, setLogoName] = useState("");

  const logoChange = (e) => {
    if (e.target.name === "logo") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setLogo(reader.result);
          setLogoName(e.target.files[0].name);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const postHandler = (e) => {
    e.preventDefault();
    const skillsArr = skillsRequired.split(",");
    const data = { title, description, companyName, location, logo, skillsRequired: skillsArr, experience, salary, category, employmentType };
    dispatch(createJobPost(data));

    // Reset form
    setTitle("");
    setDescription("");
    setCompanyName("");
    setLocation("");
    setSalary("");
    setExperience("");
    setSkillsRequired("");
    setCategory("");
    setEmploymentType("");
    setLogo("");
    setLogoName("");
  }

  return (
    <>
      <MetaData title="Post Job" />
      <div className='bg-gray-100 pt-12 md:px-20 px-4 text-gray-800'>
        <div className='flex justify-center w-full items-start pt-12'>
          <form onSubmit={postHandler} className='md:w-3/4 w-full shadow-lg rounded-lg p-6 bg-white'>
            <div className='text-center mb-6'>
              <p className='text-2xl font-medium'>Post Job</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Job Title */}
              <div className='flex items-center border border-gray-300 rounded-md p-2'>
                <MdOutlineWorkOutline className='text-gray-600' size={20} />
                <input
                  value={title} onChange={(e) => setTitle(e.target.value)}
                  required placeholder='Job Title' type="text" className='outline-none w-full text-gray-800 px-2 py-1' />
              </div>

              {/* Company Name */}
              <div className='flex items-center border border-gray-300 rounded-md p-2'>
                <BiBuilding className='text-gray-600' size={20} />
                <input
                  value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                  required placeholder='Company Name' type="text" className='outline-none w-full text-gray-800 px-2 py-1' />
              </div>

              {/* Company Logo */}
              <div className='flex items-center border border-gray-300 rounded-md p-2'>
                <div className='text-gray-600'>
                  {logo.length !== 0 ? <img src={logo} className='w-[3em]' alt="" /> : <BiImageAlt size={20} />}
                </div>
                <label htmlFor='logo' className='outline-none cursor-pointer text-gray-800 px-2 py-1'>
                  {logoName.length === 0 ? <span className='text-gray-400'>Select Company Logo...</span> : logoName}
                </label>
                <input id='logo' name='logo' required onChange={logoChange} accept="image/*" type="file" className='outline-none hidden' />
              </div>

              {/* Experience */}
              <div className='flex items-center border border-gray-300 rounded-md p-2'>
                <MdOutlineReceiptLong className='text-gray-600' size={20} />
                <input
                  value={experience} onChange={(e) => setExperience(e.target.value)}
                  required placeholder='Experience' type="text" className='outline-none w-full text-gray-800 px-2 py-1' />
              </div>

              {/* Location */}
              <div className='flex items-center border border-gray-300 rounded-md p-2'>
                <MdOutlineLocationOn className='text-gray-600' size={20} />
                <input
                  value={location} onChange={(e) => setLocation(e.target.value)}
                  required placeholder='Location' type="text" className='outline-none w-full text-gray-800 px-2 py-1' />
              </div>

              {/* Salary */}
              <div className='flex items-center border border-gray-300 rounded-md p-2'>
                <MdAttachMoney className='text-gray-600' size={20} />
                <input
                  value={salary} onChange={(e) => setSalary(e.target.value)}
                  required placeholder='Salary' type="text" className='outline-none w-full text-gray-800 px-2 py-1' />
              </div>

              {/* Job Description */}
              <div className='flex items-start border border-gray-300 rounded-md p-2'>
                <MdOutlineFeaturedPlayList className='text-gray-600 mt-2' size={20} />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Job Description' className='outline-none w-full text-gray-800 px-2 py-1 h-24' />
              </div>

              {/* Skills Required */}
              <div className='flex items-start border border-gray-300 rounded-md p-2'>
                <MdWorkspacesOutline className='text-gray-600 mt-2' size={20} />
                <textarea
                  value={skillsRequired} onChange={(e) => setSkillsRequired(e.target.value)}
                  placeholder='Required Skills' className='outline-none w-full text-gray-800 px-2 py-1 h-24' />
              </div>

              {/* Category */}
              <div className='col-span-1 md:col-span-2'>
                <select required onChange={(e) => setCategory(e.target.value)} value={category} className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white">
                  <option value="">Select Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>

              {/* Employment Type */}
              <div className='col-span-1 md:col-span-2'>
                <select required onChange={(e) => setEmploymentType(e.target.value)} value={employmentType} className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 bg-white">
                  <option value="">Select Employment Type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            <div className='mt-6'>
              <button disabled={loading} className='bg-blue-800 text-white flex justify-center items-center px-8 w-full py-2 rounded-md font-semibold'>
                {loading ? <TbLoader2 className='animate-spin' size={24} /> : "Post Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
