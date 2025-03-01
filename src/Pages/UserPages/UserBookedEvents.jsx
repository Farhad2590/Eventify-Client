import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";

const UserBookedEvents = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const validCoupon = "DISCOUNT5";

  useEffect(() => {
    if (user && user.email) {
      axiosSecure
        .get(`/confirmEvents/${user.email}`)
        .then((response) => {
          const filteredCarts = response.data.filter(event => event.payment === "Pending");
          setCarts(filteredCarts);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
          setLoading(false);
        });
    }
  }, [axiosSecure, user]);


  useEffect(() => {
    const total = carts.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalPrice(total);
    const calculatedTax = Math.ceil(total / 1000) * 4;
    setTax(calculatedTax);
  }, [carts]);


  const handleApplyCoupon = () => {
    if (couponCode === validCoupon) {
      setDiscount(totalPrice * 0.05);
    } else {
      setDiscount(0);
    }
  };


  const finalTotal = totalPrice + tax - discount;

  return (
    <div className="mx-auto">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div>
          <TitleAndSubheading title="Booked Events" />
          <div className="font-sans max-w-full md:max-w-5xl mx-auto bg-white py-4 px-2 sm:px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Main Content Section */}
              <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
                <div className="space-y-4">
                  <div className="flex flex-col md:grid md:grid-cols-1 gap-4">
                    {carts.map((item) => (
                      <div key={item._id} className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-md shadow-md">

                        {/* Image Container */}
                        <div className="w-full sm:w-48 md:w-64 h-48 sm:h-48 md:h-64 bg-white p-2 rounded-md">
                          <img
                            src={item.carrt_Image}
                            className="w-full h-full object-contain"
                            alt={item.package_name}
                          />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 w-full text-center md:text-left space-y-2">
                          <h3 className="text-xl md:text-2xl font-bold text-gray-800">{item.package_name}</h3>

                          <div className="flex justify-between items-center text-center">
                            <h6 className="text-xs text-red-500 cursor-pointer mt-0.5">Remove</h6>
                            <h4 className="text-base font-bold text-gray-800">${item.totalPrice}</h4>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-gray-600">
                            <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                            <p>Duration: {item.duration_hours} hours</p>
                          </div>

                          <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-gray-600">
                            <p>Expected Attendance: {item.expected_attendance}</p>
                            <p>Staff Team Size: {item.staff_team_size} members</p>
                          </div>

                          <div className="flex flex-wrap items-center gap-1">
                            <h5 className="font-semibold text-gray-800">Features:</h5>
                            {item.features.map((feature, index) => (
                              <span key={index} className="text-gray-600 text-sm">
                                *{feature}{index < item.features.length - 1 && ', '}
                              </span>
                            ))}
                          </div>

                          <p className="text-sm text-gray-600">Payment: {item.payment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Section */}
              <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
                <div className="flex border border-blue-600 overflow-hidden rounded-md">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo code"
                    className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white"
                  >
                    Apply
                  </button>
                </div>

                <ul className="text-gray-800 mt-8 space-y-4">
                  <li className="flex flex-wrap gap-4 text-base">Discount <span className="ml-auto font-bold">${discount.toFixed(2)}</span></li>
                  <li className="flex flex-wrap gap-4 text-base">Tax <span className="ml-auto font-bold">${tax.toFixed(2)}</span></li>
                  <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">${finalTotal.toFixed(2)}</span></li>
                </ul>

                <div className="mt-8 space-y-2">
                  <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default UserBookedEvents;
