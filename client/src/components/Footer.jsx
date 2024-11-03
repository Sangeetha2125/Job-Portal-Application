import React from 'react';
import { MdOutlineBusinessCenter } from 'react-icons/md';
import { FaFacebook, FaTwitterSquare, FaYoutube } from 'react-icons/fa';
import { AiFillInstagram, AiFillMail } from 'react-icons/ai';

export const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-8 mt-auto">
      <div className="mx-auto px-[5rem] flex justify-between items-center px-4">
        <div className="flex flex-col text-sm gap-1">
          <p className="font-bold text-lg">Contact Us</p>
          <p>Address: Job Portal, Wall Street, New York, 123, United States</p>
          <p>Email: info@jobportal.com</p>
          <p>Phone: +123-456-7890</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="titleT text-2xl flex items-center">
            <MdOutlineBusinessCenter className="mr-2" /> Job Portal
          </p>
          <p className="text-sm text-gray-300">
            Giving the best opportunities to the best people.
          </p>
          <div className="flex gap-5 py-2 justify-center">
            <FaFacebook className="cursor-pointer hover:text-[#2D68C4] duration-200 ease" size={22} />
            <FaTwitterSquare className="cursor-pointer hover:text-[#1DA1F2] duration-200 ease" size={22} />
            <FaYoutube className="cursor-pointer hover:text-[#FF0000] duration-200 ease" size={22} />
            <AiFillInstagram className="cursor-pointer hover:text-[#C13584] duration-200 ease" size={22} />
            <AiFillMail className="cursor-pointer hover:text-[#D44638] duration-200 ease" size={22} />
          </div>
        </div>

        <div className="flex flex-col items-end text-sm">
          <p className="mt-1">
            Designed and Developed by Sangeetha G
          </p>
          <p className='pt-1'>© Copyright, All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
