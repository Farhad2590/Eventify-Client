import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useIndividualModeratorEvents = () => {
    const axiosSecure = useAxiosSecure();
    const {user}= useAuth()

    const { data: filteredEvents, isLoading: isEventsLoading, error, refetch } = useQuery({
        queryKey: ['filteredEvents', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get('/eventConfirmed');
            return response.data.filter(event => event.event_organizer === user.email);
        },
        enabled: !!user?.email,
    });

    return [filteredEvents, isEventsLoading, error, refetch] ;
};

export default useIndividualModeratorEvents;
