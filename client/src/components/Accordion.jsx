import React, { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';

const Accordion = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='bg-white p-4 rounded-lg shadow-md mt-4'>
            <div className='flex justify-between items-center'>
                <h2 className='text-black p-2'>{question}</h2>
                <div className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <BiMinus className='text-2xl text-blue-800 font-bold' /> : <BiPlus className='text-2xl text-blue-800 font-bold' />}
                </div>
            </div>
            {isOpen && <p className='text-black mt-2 p-2 pt-0'>{answer}</p>}
        </div>
    );
};

export default Accordion;
