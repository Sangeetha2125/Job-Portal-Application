import React, { useEffect, useState } from 'react';
import { MetaData } from '../components/MetaData';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAppData } from '../actions/AdminActions';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { updateApplication } from '../actions/AdminActions';

export const EditAppAdmin = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { loading, applicationData } = useSelector(state => state.admin);

    const [status, setStatus] = useState("not");

    useEffect(() => {
        dispatch(getAppData(id));
    }, [dispatch, id]);

    const updateStatusHandler = () => {
        const data = {
            status,
        };
        dispatch(updateApplication(id, data));
    };

    const toUpperFirst = (str = "") => {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
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

    function extractTime(inputString) {
        const dateTimeObj = new Date(inputString);
        const hours = dateTimeObj.getHours();
        const minutes = dateTimeObj.getMinutes();
        const seconds = dateTimeObj.getSeconds();
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;

        return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
    }

    return (
        <>
            <MetaData title="Update Application" />
            <div className="bg-gray-50 min-h-screen pt-14 md:px-20 px-3 text-gray-900">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="space-y-8">
                        {/* Application Title */}
                        <div className="py-4 text-2xl md:text-4xl font-semibold bg-white shadow-md rounded-lg p-5">
                            Application #{id}
                        </div>

                        {/* Job Details Card */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <p className="text-2xl font-semibold pb-4">Job Details:</p>
                            <ul className="space-y-2">
                                <li className="flex gap-4 items-center">
                                    <strong>Role:</strong> <div>{applicationData.job.title}</div>
                                </li>
                                <li className="flex gap-4 items-center">
                                    <strong>Company:</strong> <div>{applicationData.job.companyName}</div>
                                </li>
                                <li className="flex gap-4 items-center">
                                    <strong>Location:</strong> <div>{applicationData.job.location}</div>
                                </li>
                                <li className="flex gap-4 items-center">
                                    <strong>Experience:</strong> <div>{applicationData.job.experience}</div>
                                </li>
                            </ul>
                        </div>

                        {/* Applicant Details Card */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <p className="text-2xl font-semibold pb-4">Applicant's Details:</p>
                            <ul className="space-y-2">
                                <li className="flex gap-4 items-center">
                                    <strong>Name:</strong> <div>{applicationData.applicant.name}</div>
                                </li>
                                <li className="flex gap-4 items-center">
                                    <strong>Email:</strong> <div>{applicationData.applicant.email}</div>
                                </li>
                                <li className="flex gap-4 items-center">
                                    <strong>Resume:</strong> 
                                    <Link
                                        to={applicationData.applicantResume.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        {applicationData.applicant.name} resume
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Status Display Card */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="flex gap-3 items-center text-xl font-semibold">
                                <strong>Status:</strong>{" "}
                                <span
                                    className={`${
                                        applicationData.status === "pending"
                                            ? "text-blue-600"
                                            : applicationData.status === "rejected"
                                            ? "text-red-600"
                                            : "text-green-600"
                                    }`}
                                >
                                    {toUpperFirst(applicationData.status)}
                                </span>
                            </div>
                        </div>

                        {/* Update Status Card */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="flex gap-4 items-center">
                                <div className="w-full">
                                    <select
                                        onChange={(e) => setStatus(e.target.value)}
                                        value={status}
                                        className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="not">Select Status</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                                <button
                                    onClick={updateStatusHandler}
                                    className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-500 transition-colors duration-200"
                                >
                                    Update Status
                                </button>
                            </div>
                        </div>

                        {/* Application Created At Card */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="flex gap-3 items-center text-xl">
                                <strong>Application Created At:</strong>{" "}
                                {convertDateFormat(applicationData.createdAt.substr(0, 10))} on{" "}
                                {extractTime(applicationData.createdAt)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
