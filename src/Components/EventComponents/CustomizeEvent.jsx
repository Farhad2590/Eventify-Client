import React, { useState } from 'react';
import { useLoaderData } from "react-router-dom";
import AdjustableParameter from './AdjustableParameter';

const CustomizeEvent = () => {
    const initialEvent = useLoaderData();
    const [event, setEvent] = useState(initialEvent);

    const updateParameter = (parameter, increment, pricePerUnit) => {
        setEvent(prevEvent => ({
            ...prevEvent,
            [parameter]: Math.max(1, prevEvent[parameter] + increment),
            price: prevEvent.price + (pricePerUnit * increment)
        }));
    };

    const resetParameter = (parameter, defaultValue, pricePerUnit) => {
        setEvent(prevEvent => ({
            ...prevEvent,
            [parameter]: defaultValue,
            price: prevEvent.price - (pricePerUnit * (prevEvent[parameter] - defaultValue))
        }));
    };

    return (
        <div className="flex justify-center p-6">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-md dark:bg-gray-800">
                <img
                    className="object-cover w-full h-64 rounded-t-lg"
                    src={event.carrt_Image}
                    alt={event.package_name}
                />

                <div className="p-6">
                    <div className='flex justify-between'>
                        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">{event.package_name}</h1>
                        <p className="text-xl mb-4 text-gray-600 dark:text-gray-300">Category: {event.category}</p>
                    </div>
                    <p className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Price: {event.price.toLocaleString()} taka</p>

                    <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">Features:</h2>
                    <div className="mb-6 flex flex-wrap gap-2">
                        {event.features.map((feature, index) => (
                            <button
                                key={index}
                                className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                            >
                                {feature}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <AdjustableParameter
                            parameter="photography_team_size"
                            label="Photography Team Size"
                            pricePerUnit={300}
                            unit="members"
                            defaultValue={initialEvent.photography_team_size}
                            value={event.photography_team_size}
                            onUpdate={updateParameter}
                            onReset={resetParameter}
                        />
                        <AdjustableParameter
                            parameter="duration_hours"
                            label="Duration"
                            pricePerUnit={1000}
                            unit="hours"
                            defaultValue={initialEvent.duration_hours}
                            value={event.duration_hours}
                            onUpdate={updateParameter}
                            onReset={resetParameter}
                        />
                        <AdjustableParameter
                            parameter="expected_attendance"
                            label="Expected Attendance"
                            pricePerUnit={50}
                            unit="people"
                            defaultValue={initialEvent.expected_attendance}
                            value={event.expected_attendance}
                            onUpdate={updateParameter}
                            onReset={resetParameter}
                        />
                        <AdjustableParameter
                            parameter="staff_team_size"
                            label="Staff Team Size"
                            pricePerUnit={500}
                            unit="members"
                            defaultValue={initialEvent.staff_team_size}
                            value={event.staff_team_size}
                            onUpdate={updateParameter}
                            onReset={resetParameter}
                        />
                        <p className="text-gray-600 dark:text-gray-300 text-xl font-extrabold">Videography: {event.videography ? 'Yes' : 'No'}</p>
                    </div>
                </div>

                <div className="px-6 pb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Event Images</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {event.images.map((image, index) => (
                            <img
                                key={index}
                                className="object-cover w-full h-48 rounded-lg"
                                src={image}
                                alt={`Event image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomizeEvent;