import { useEffect, useState } from "react";
import Table from "../../Components/ModerratorEvents/Table";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";
import useAuth from "../../hooks/useAuth";

const Eventstatus = () => {
    const axiosSecure = useAxiosSecure();
    const [carts, setCarts] = useState([]);
    // const [loading, setLoading] = useState(true);
    const {  user } = useAuth();
    // console.log();
    
    useEffect(() => {
        axiosSecure
            .get(`/eventConfirmed`)
            .then((response) => {
                const filteredCarts = response.data.filter(cart => cart.event_organizer === user.email);
                setCarts(filteredCarts);
                // setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
                // setLoading(false);
            });

    }, [axiosSecure]);
    console.log(carts);
    return (
        <div className="mx-auto">
            <TitleAndSubheading title="Event Suggested and Complted"></TitleAndSubheading>
            <Table carts={carts}></Table>
        </div>
    );
};

export default Eventstatus;