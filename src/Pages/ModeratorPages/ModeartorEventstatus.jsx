
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";
import useIndividualModeratorEvents from "../../hooks/useIndividualModeratorEvents";

const ModeartorEventstatus = () => {
    const axiosSecure = useAxiosSecure();
    const [filteredEvents, refetch] = useIndividualModeratorEvents()


    const handleSave = async (id) => {
        console.log(id);

        try {
            const bookingData = {
                event_organizer: "",
                moderator: ""
            };
            const { data: update } = await axiosSecure.put(`/addOrganizer/${id}`, bookingData);
            console.log("Update successful:", update);
            refetch();
        } catch (err) {
            console.log("Error updating:", err.message);
        }
    };
    const handleCompleted = async (id) => {
        console.log(id);

        try {
            const bookingData = {
                event_organizer: "completed",
            };
            const { data: update } = await axiosSecure.put(`/addOrganizer/${id}`, bookingData);
            console.log("Update successful:", update);
            refetch();
        } catch (err) {
            console.log("Error updating:", err.message);
        }
    };
    const handleAccept = async (id) => {
        console.log(id);

        try {
            const bookingData = {
                moderator: "assigned"
            };
            const { data: update } = await axiosSecure.put(`/addOrganizer/${id}`, bookingData);
            console.log("Update successful:", update);
            refetch();
        } catch (err) {
            console.log("Error updating:", err.message);
        }
    };

    return (
        <div className="mx-auto">
            <TitleAndSubheading title="Event Suggested and Complted"></TitleAndSubheading>
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
                        {filteredEvents?.map((project, index) => (
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
                                    {project.moderator === "" ? (
                                        <button className="btn" onClick={() => handleAccept(project._id)}>Accept Event</button>
                                    ) : (
                                        <span>Ongoing</span>
                                    )}
                                </td>

                                <td className="p-4 border-b border-blue-gray-50">
                                    {project.moderator === "" ? (
                                        <button className="btn" onClick={() => handleSave(project._id)}>Ignore Event</button>
                                    ) : (
                                        <button className="btn" onClick={() => handleCompleted(project)}>Event Completed</button>
                                    )}
                                </td>


                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ModeartorEventstatus;