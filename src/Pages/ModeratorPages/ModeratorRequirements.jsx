import { useEffect, useState } from "react";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const ModeratorRequirements = () => {
    const [events, setEvents] = useState([]);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure
            .get(`/eventConfirmed`)
            .then((response) => {
                const filteredCarts = response.data.filter(cart =>
                    cart.event_organizer === user.email && cart.moderator === "assigned"
                );
                setEvents(filteredCarts);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    }, [axiosSecure, user.email]);
    return (
        <div className="mx-auto">
            <TitleAndSubheading title="Add Requirements"></TitleAndSubheading>
            <div className="flex items-center">
                <h4 className="text-2xl">Add Requirement For</h4>
                <select className="ml-4 p-2 border rounded">
                    {events.map((event) => (
                        <option key={event._id} value={event._id}>
                            {event.package_name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h1 className="text-xl">Chair Needed  : </h1>
            </div>

        </div>
    );
};

export default ModeratorRequirements;