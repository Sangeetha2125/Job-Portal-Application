import { MetaData } from '../components/MetaData';
import Testimonials from '../components/Testimonials/Testimonials.jsx';
import Accordion from "../components/Accordion";

export const Home = () => {

    const cardStyle = "bg-white p-6 rounded-lg shadow-lg";

    return (
        <>
            <MetaData title="Job Portal" />
            <div className='flex flex-col text-gray-800 bg-gray-100'>
                <div className='banner'>
                    <div className='flex flex-col justify-center items-center h-full bg-black bg-opacity-50'>
                        <h1 className='md:text-8xl text-6xl titleT text-white'>Job Portal</h1>
                        <p className='md:text-xl text-sm text-white'>Your <span className='text-blue-500 font-bold'>pathway</span> to professional success</p>
                    </div>
                </div>
            </div>
            <div className="md:px-20 px-3 text-gray-800 bg-gray-100">
                <div className="grid md:grid-cols-3 gap-5 md:px-0 px-2 pt-16 pb-8">
                    <div className={cardStyle}>
                        <p className="text-2xl pb-3 font-bold text-center text-blue-800">About Us</p>
                        <p className="leading-8 text-md">
                            At Job Portal, we're more than just a job application platform –
                            we're your partners in realizing your professional aspirations.
                            Our mission is to connect talented individuals with remarkable
                            opportunities that elevate their careers and enrich their lives.
                            Whether you're a recent graduate stepping into the workforce or a
                            seasoned professional seeking new horizons, Job Portal is here to
                            guide you every step of the way.
                        </p>
                    </div>
                    <div className={cardStyle}>
                        <p className="text-2xl pb-3 font-bold text-center text-blue-800">What Sets Us Apart</p>
                        <ul className="list-disc px-5">
                            <li className="leading-8 text-md pb-2">
                                <span className="font-semibold text-md">
                                    Tailored Matches:
                                </span>{" "}
                                We understand that each candidate and company is unique. Our
                                advanced matching algorithms ensure that your skills align
                                perfectly with the roles you're interested in, saving you time
                                and effort.
                            </li>
                            <li className="leading-8 text-md">
                                <span className="font-semibold text-md">
                                    Exceptional Support:
                                </span>{" "}
                                Your success is our priority. Our dedicated support team is
                                always ready to assist you, from optimizing your profile to
                                preparing for interviews.
                            </li>
                        </ul>
                    </div>
                    <div className={cardStyle}>
                        <p className="text-2xl pb-3 font-bold text-center text-blue-800">Join the Job Portal Community</p>
                        <p className="leading-8 text-md pb-2">
                            When you join Job Portal, you're not just signing up for a platform –
                            you're becoming part of a dynamic community of professionals,
                            recruiters, and mentors. Together, we're shaping the future of
                            work, one opportunity at a time.
                        </p>
                        <p className="leading-8 text-md">
                            Thank you for choosing Job Portal as your partner in career
                            advancement. Here's to unlocking a world of possibilities and
                            achieving greatness together!
                        </p>
                    </div>
                </div>
            </div>
            <div className='md:px-20 px-3 flex text-gray-800 bg-gray-100'>
                <div className='w-full flex flex-col justify-start items-center gap-4'>
                    <div className='py-12'>
                        <Testimonials />
                    </div>
                </div>
            </div>
            <div className='md:px-20 px-3 text-gray-800 bg-gray-100'>
                <div className="flex flex-col gap-5 md:px-0 px-2 md:pt-8 pt-4 pb-20">
                    <div className='px-[1rem]'>
                        <div className='text-2xl text-darkblue font-bold pb-4'>
                            Frequently Asked Questions (FAQs):
                        </div>
                        <Accordion
                            question="How do I create an account on your job application platform?"
                            answer="To create an account, click on the 'Register' button located at the top right corner of the homepage. Fill in your personal information, including your name, email address, and a secure password. Once your account is created, you can start exploring jobs."
                        />
                        <Accordion
                            question="What should I include in my job application?"
                            answer="Crafting an effective job application is crucial to stand out to potential employers. Make sure to include a tailored resume that highlights your relevant experience and skills. Additionally, write a resume that showcases how your qualifications align with the job requirements."
                        />
                        <Accordion
                            question="How can I check the status of my job application?"
                            answer="After submitting your applications, you can log in to your account dashboard. Here, you'll find a section that lists your submitted applications along with their current statuses. The statuses may include accepted, rejected, or pending."
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
