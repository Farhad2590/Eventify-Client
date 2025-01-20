import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";

const UserConfirmedEvents = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [carts, setCarts] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(carts);


    useEffect(() => {
        if (user && user.email) {
            axiosSecure
                .get(`/confirmEvents/${user.email}`)
                .then((response) => {
                    const filteredCarts = response.data.filter(event => event.payment === "Advance_Done");
                    setCarts(filteredCarts);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching events:", error);
                    setLoading(false);
                });
        }
    }, [axiosSecure, user]);
    console.log(carts);

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            ) : (
                <div className="mx-auto">
                    <TitleAndSubheading title="Confirmed Events" />
                    <div className="max-w-md md:max-w-5xl mx-auto bg-white py-4">

                        <div className="space-y-4 bg-gray-100 p-4 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                                {carts.map((item) => (
                                    <div key={item._id} className="col-span-1 md:col-span-3 flex flex-col md:flex-row items-center gap-4">

                                        {/* Image Container */}
                                        <div className="w-full md:w-64 h-48 md:h-64 bg-white p-2 rounded-md">
                                            <img
                                                src={item.carrt_Image}
                                                className="w-full h-full object-contain"
                                                alt={item.package_name}
                                            />
                                        </div>

                                        {/* Text Content */}
                                        <div className="flex-1 text-center md:text-left">
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-800">{item.package_name}</h3>

                                            <div className="flex justify-between items-center mt-2">
                                                <h6 className="text-xs text-red-500 cursor-pointer">Remove</h6>
                                                <h4 className="text-base font-bold text-gray-800">${item.totalPrice}</h4>
                                            </div>

                                            {/* Additional Information */}
                                            <div className="flex flex-col md:flex-row justify-between mt-2 text-sm text-gray-600">
                                                <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                                                <p>Duration: {item.duration_hours} hours</p>
                                            </div>

                                            <div className="flex flex-col md:flex-row justify-between mt-2 text-sm text-gray-600">
                                                <p>Expected Attendance: {item.expected_attendance}</p>
                                                <p>Staff Team Size: {item.staff_team_size} members</p>
                                            </div>

                                            {/* Features */}
                                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-1 mt-2">
                                                <h5 className="font-semibold text-gray-800">Features:</h5>
                                                {item.features.map((feature, index) => (
                                                    <span key={index} className="text-gray-600 text-sm">
                                                        *{feature}{index < item.features.length - 1 && ', '}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Payment Status */}
                                            <p className="text-sm text-gray-600 mt-2">Payment: {item.payment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>

            )}
        </div>
    );
};

export default UserConfirmedEvents;
