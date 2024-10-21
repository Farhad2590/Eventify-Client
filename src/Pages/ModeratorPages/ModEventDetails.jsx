import React from 'react';
import TitleAndSubheading from '../../Shared/TitleAndSubheading';
import { useLoaderData } from 'react-router-dom';
import AdjustableParameter from '../../Components/EventComponents/AdjustableParameter';

const ModEventDetails = () => {

    const data = useLoaderData();
    console.log(data);


    return (
        <div className='w-full mx-auto'>
            <TitleAndSubheading title="Event Details"></TitleAndSubheading>
            <div className="max-w-4xl p-6 mx-auto w-full bg-white rounded-lg shadow-md dark:bg-gray-800">
                <img
                    className="object-cover w-full h-64 rounded-t-lg"
                    src={data?.carrt_Image}
                    alt={data?.package_name}
                />

                <div className='mt-5'>
                    <div className='flex justify-between'>
                        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{data?.package_name}</h1>
                        <p className="text-xl mb-4 text-gray-600 dark:text-gray-300">Category: {data?.category}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Price: {data?.price?.toLocaleString()} taka</p>
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ">
                    <div className="d-flex align-items-center flex-column mb-4" style={{ gap: ".5rem" }}>
                        <div className="flex align-items-center justify-content-center mb-2" style={{ gap: ".5rem" }}>
                            <div className="text-gray-600 dark:text-gray-300 mb-2 text-xl font-extrabold">Photography Team Size:</div>
                            <div>
                                <span className="fs-3 text-xl font-extrabold">{data?.photography_team_size}</span> members
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center flex-column mb-4" style={{ gap: ".5rem" }}>
                        <div className="flex align-items-center justify-content-center mb-2" style={{ gap: ".5rem" }}>
                            <div className="text-gray-600 dark:text-gray-300 mb-2 text-xl font-extrabold">Duration:</div>
                            <div>
                                <span className="fs-3 text-xl font-extrabold">{data?.duration_hours}</span> hours
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center flex-column mb-4" style={{ gap: ".5rem" }}>
                        <div className="flex align-items-center justify-content-center mb-2" style={{ gap: ".5rem" }}>
                            <div className="text-gray-600 dark:text-gray-300 mb-2 text-xl font-extrabold">Expected Attendance:</div>
                            <div>
                                <span className="fs-3 text-xl font-extrabold">{data?.expected_attendance}</span> people
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center flex-column mb-4" style={{ gap: ".5rem" }}>
                        <div className="flex align-items-center justify-content-center mb-2" style={{ gap: ".5rem" }}>
                            <div className="text-gray-600 dark:text-gray-300 mb-2 text-xl font-extrabold">Staff Team Size:</div>
                            <div>
                                <span className="fs-3 text-xl font-extrabold">{data?.staff_team_size}</span> members
                            </div>
                        </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-xl font-extrabold">Videography: {data?.videography ? 'Yes' : 'No'}</p>
                </div>

                <div className="px-6 pb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Event Images</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {data?.images?.map((image, index) => (
                            <img
                                key={index}
                                className="object-cover w-full h-48 rounded-lg"
                                src={image}
                                alt={`data image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModEventDetails;