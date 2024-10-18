import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
    const { user, loading } = useAuth();  
    const axiosSecure = useAxiosSecure(); 

    const { data: userData, isLoading: isUserLoading } = useQuery({
        queryKey: ['user', user?.email],  
        enabled: !loading && !!user?.email,  
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/${user?.email}`); 
            return data;
        },
    });

    return [userData, isUserLoading];  
};

export default useUser;
