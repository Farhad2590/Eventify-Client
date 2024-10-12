import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useFetchModerators = () => {
    const axiosSecure = useAxiosSecure();  // Use secure axios instance
    
    const { data: moderatorsEmails, isLoading: isModeratorsLoading, refetch } = useQuery({
        queryKey: ['moderators'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users`);
            const moderators = data.filter(user => user.role === 'moderator');
            return moderators.map(moderator => moderator.email);  // Return emails of moderators
        }
    });

    return [moderatorsEmails, isModeratorsLoading, refetch];  // Include refetch
};

export default useFetchModerators;
