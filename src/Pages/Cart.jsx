import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const Cart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.email) {
      axiosSecure
        .get(`/confirmEvents/${user.email}`)
        .then((response) => {
          setCarts(response.data);
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
        <div className="font-sans md:max-w-5xl max-md:max-w-xl mx-auto bg-white py-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
              <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
              <hr className="border-gray-300 mt-4 mb-8" />

              <div className="space-y-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  {carts.map((item) => (
                    <div key={item._id} className="col-span-3 flex items-center gap-4">
                      <div className="w-64 h-64 shrink-0 bg-white p-2 rounded-md">
                        <img
                          src={item.carrt_Image}
                          className="w-full h-full object-contain"
                          alt={item.package_name}
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800">{item.package_name}</h3>
                        <div className="flex justify-between">
                          <h6 className="text-xs text-red-500 cursor-pointer mt-0.5">Remove</h6>
                          <h4 className="text-base font-bold text-gray-800">${item.price}</h4>
                        </div>

                        {/* Additional Information */}
                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600">Date: {new Date(item.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">Duration: {item.duration_hours} hours</p>
                        </div>

                        <div className="flex justify-between">
                          <p className="text-sm text-gray-600">Expected Attendance: {item.expected_attendance}</p>
                          <p className="text-sm text-gray-600"> staff_team_size: {item.staff_team_size} members</p>
                        </div>
                        {/* Features */}
                        <div className="flex flex-wrap items-center gap-1">
                          <h5 className="font-semibold text-gray-800">Features:</h5>
                          {item.features.map((feature, index) => (
                            <span key={index} className="text-gray-600 text-sm">
                              *{feature}{index < item.features.length - 1 && ', '}
                            </span>
                          ))}
                        </div>

                        {/* Payment Status */}
                        <p className="text-sm text-gray-600">Payment: {item.payment}</p>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-md p-4 md:sticky top-0">
              <div className="flex border border-blue-600 overflow-hidden rounded-md">
                <input type="email" placeholder="Promo code"
                  className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-2.5" />
                <button type='button' className="flex items-center justify-center font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 px-4 text-sm text-white">
                  Apply
                </button>
              </div>

              <ul className="text-gray-800 mt-8 space-y-4">
                <li className="flex flex-wrap gap-4 text-base">Discount <span className="ml-auto font-bold">$0.00</span></li>
                <li className="flex flex-wrap gap-4 text-base">Tax <span className="ml-auto font-bold">$4.00</span></li>
                <li className="flex flex-wrap gap-4 text-base font-bold">Total <span className="ml-auto">$52.00</span></li>
              </ul>

              <div className="mt-8 space-y-2">
                <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;