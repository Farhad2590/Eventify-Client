import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useConfirmedEvents = () => {
    const axiosSecure = useAxiosSecure();

    // Using React Query to fetch confirmed events
    const { data: confirmedEvents, isLoading: isEventsLoading, refetch } = useQuery({
        queryKey: ['eventConfirmed'],
        queryFn: async () => {
            const response = await axiosSecure.get('/eventConfirmed');
            // Filter the events with payment status 'Advance_Done'
            return response.data.filter(cart => cart.payment === "Advance_Done");
        }
    });

    return [confirmedEvents, isEventsLoading, refetch] ;
};

export default useConfirmedEvents;
