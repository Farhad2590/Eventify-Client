import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useModerator = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { data: isModerator, isLoading: isModeratorLoading } = useQuery({
        queryKey: ['moderator'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/moderator/${user?.email}`)
            return data?.moderator;
        }
    })
    return [isModerator, isModeratorLoading]

}
export default useModerator;