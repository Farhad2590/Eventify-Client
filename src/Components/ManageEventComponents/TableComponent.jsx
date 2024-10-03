
const TableComponent = ({ carts }) => {
    console.log(carts);

    //     {
    //         name: "React carts",
    //         startDate: "10 Dec 2023",
    //         teamLead: {
    //             name: "John Michael",
    //             email: "john@creative-tim.com",
    //             image: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
    //         },
    //         function: {
    //             role: "Manager",
    //             department: "Organization"
    //         },
    //         status: "Completed",
    //         statusColor: "green",
    //         deadline: "23/04/18"
    //     },
    //     {
    //         name: "Angular Project",
    //         startDate: "10 Dec 2023",
    //         teamLead: {
    //             name: "Alexa Liras",
    //             email: "alexa@creative-tim.com",
    //             image: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg"
    //         },
    //         function: {
    //             role: "Programator",
    //             department: "Developer"
    //         },
    //         status: "Active",
    //         statusColor: "purple",
    //         deadline: "23/04/18"
    //     },
    //     {
    //         name: "Tailwind Project",
    //         startDate: "10 Dec 2023",
    //         teamLead: {
    //             name: "Laurent Perrier",
    //             email: "laurent@creative-tim.com",
    //             image: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg"
    //         },
    //         function: {
    //             role: "Executive",
    //             department: "Projects"
    //         },
    //         status: "Scheduled",
    //         statusColor: "yellow",
    //         deadline: "19/09/17"
    //     },
    //     {
    //         name: "Laravel Project",
    //         startDate: "10 Dec 2023",
    //         teamLead: {
    //             name: "Michael Levi",
    //             email: "michael@creative-tim.com",
    //             image: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg"
    //         },
    //         function: {
    //             role: "Programator",
    //             department: "Developer"
    //         },
    //         status: "Completed",
    //         statusColor: "green",
    //         deadline: "24/12/08"
    //     },
    //     {
    //         name: "Astro Project",
    //         startDate: "10 Dec 2023",
    //         teamLead: {
    //             name: "Richard Gran",
    //             email: "richard@creative-tim.com",
    //             image: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg"
    //         },
    //         function: {
    //             role: "Manager",
    //             department: "Executive"
    //         },
    //         status: "Pending",
    //         statusColor: "red",
    //         deadline: "04/10/21"
    //     }
    // ];

    return (
        <div className="p-6 overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {["Name & Category", "User Info", "Event Info", "Status", "Delete"].map((head) => (
                            <th key={head} className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                                    {head}
                                </p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {carts.map((project, index) => (
                        <tr key={index}>
                            <td className="p-4 border-b border-blue-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col">
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{project.package_name}</p>
                                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">Category: {project.category}</p>
                                        {/* <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">{project.package_name}</p> */}

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
                                <button className="btn">Add Organizer</button>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <button className="btn">Delete Event</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default TableComponent;