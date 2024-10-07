import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";
import TableComponent from "../../Components/ManageEventComponents/TableComponent";



const ManageEvents = () => {
    const axiosSecure = useAxiosSecure();
    const [carts, setCarts] = useState([]);
    // const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        axiosSecure
            .get(`/eventConfirmed`)
            .then((response) => {
                const filteredCarts = response.data.filter(cart => cart.payment === "Advance_Done");
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
        <div className="container mx-auto">
            <TitleAndSubheading title="Manage Events"></TitleAndSubheading>
            <TableComponent carts={carts}/>
        </div>
    );
};

export default ManageEvents;