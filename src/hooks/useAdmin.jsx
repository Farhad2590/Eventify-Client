import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure"
const useAdmin = () => {
    const {user, loading}= useAuth()
    
    const axiosSecure = useAxiosSecure()
    const {data:isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['admin'],
        enabled: !loading && !!user?.email,
        queryFn: async () =>{
            const {data} = await axiosSecure.get(`/admin/${user?.email}`)
            return data?.admin;
            
            
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;