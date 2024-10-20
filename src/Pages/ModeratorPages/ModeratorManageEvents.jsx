// import React from 'react';

import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";
import { Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const ModeratorManageEvents = () => {
    const [events, setEvents] = useState([]);
    // const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure
            .get(`/eventConfirmed`)
            .then((response) => {
                const filteredCarts = response.data.filter(cart =>
                    (cart.moderator === "Requirements_Added" || cart.moderator === "assigned") && cart.event_organizer === user?.email
                );
                setEvents(filteredCarts);
                // setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
                // setLoading(false);
            });
    }, [axiosSecure, user?.email]);

    console.log(events);
    const handleSave = async (id) => {
        console.log(id);
    };

    return (
        <Container maxWidth="lg">
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                    mb: 4
                }}
            >
                <TitleAndSubheading title="Manage Events"></TitleAndSubheading>
                <div className="p-6 overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {["Name & Category", "User Info", "Event Info", "See Details",].map((head) => (
                                    <th key={head} className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                        <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                            {head}
                                        </p>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {events?.map((project, index) => (
                                <tr key={index}>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{project.package_name}</p>
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">Category: {project.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <div className="flex items-center gap-3">
                                            <img src={project.user_Photo} alt={project.user_Name} className="inline-block relative object-cover object-center rounded-full w-9 h-9" />
                                            <div className="flex flex-col">
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{project.user_Name}</p>
                                                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">{project.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <div className="flex flex-col">
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">Duration: {project.duration_hours} hours</p>
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">Price: ${project.price}</p>
                                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">Event date: {new Date(project.date).toLocaleDateString()}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Link to={`/dashboard/mod/eventDetails/${project?._id}`}>
                                            <button className="btn" onClick={() => handleSave(project._id)}>See Details</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </Paper>
        </Container>
    );
};

export default ModeratorManageEvents;