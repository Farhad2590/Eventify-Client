import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";
import DatePickerModal from "../../Components/EventComponents/DatePickerModal";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [confirmDate, setconfirmDate] = useState(new Date());
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

console.log(user);

  useEffect(() => {
    axiosSecure
      .get("/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, [axiosSecure]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };

  const handleCheckAvailabilityClick = (event) => {
    setModalOpen(true);
    const date = selectedDate;
    const newConfirmDate = {
      category: event.category,
      package_name: event.package_name,
      carrt_Image: event.carrt_Image,
      price: event.price,
      features: event.features,
      images: event.images,
      photography_team_size: event.photography_team_size,
      videography: event.videography,
      duration_hours: event.duration_hours,
      expected_attendance: event.expected_attendance,
      staff_team_size: event.staff_team_size,
      date: date,
      payment: 'Pending',
      email: user.email,
      user_Name : user.displayName,
      user_Photo : user.photoURL
    };

    // Save confirmDate to state
    setconfirmDate(newConfirmDate);
  };

  const handleConfirmDate = () => {
    axiosSecure.post('/confirmEvents', confirmDate)

      .then(res => {
        if (res.data.insertedId) {
          toast.success('Event Added To Cart Successfully', {
            autoClose: 5000,
          });
          navigate('/cart')
          console.log(res);
          handleCloseModal();
        }
      })
      .catch(error => {
        toast.error(error.message)
        console.log(error);

      })

  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  // Remove duplicate categories
  const uniqueCategories = [...new Set(events?.map(event => event?.category) || [])];

  const filteredEvents = selectedCategory
    ? events?.filter(event => event?.category === selectedCategory)
    : events;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-blue-600 min-h-screen text-white transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:w-64 lg:flex-shrink-0 p-4 mt-16`}
      >
        <button
          onClick={toggleSidebar}
          className="text-black mb-6 lg:hidden text-3xl"
          aria-label="Close Sidebar"
        >
          <i className="bi bi-x"></i>
        </button>

        <h2 className="text-2xl font-bold mb-6">Event Categories</h2>
        <ul>
          {uniqueCategories?.map((category, index) => (
            <li
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer mb-4 hover:bg-white hover:text-black p-2 rounded-md"
            >
              {category}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setSelectedCategory(null)}
          className="mt-6 bg-white text-black py-2 px-4 rounded hover:bg-blue-700 hover:text-white"
        >
          Show All Events
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 ml-0 lg:ml-64">
        <TitleAndSubheading title="Events"></TitleAndSubheading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents?.map((event, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col"
              style={{ height: '650px' }}
            >
              <img
                src={event?.carrt_Image}
                alt={event?.package_name}
                className="w-full h-48 p-3 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-semibold">
                      {event?.package_name}
                    </h3>
                    <p className="text-gray-600 font-bold">
                      ${event?.price}
                    </p>
                  </div>
                  <ul className="mb-4">
                    {event?.features && Array.isArray(event.features) ? (
                      event.features?.map((feature, index) => (
                        <div key={index}>{feature}</div>
                      ))
                    ) : (
                      <div>No features available</div>
                    )}
                  </ul>
                  <p className="text-center">Team Size</p>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">
                      Photography: {event?.photography_team_size}
                    </p>
                    <p className="text-sm text-gray-600">
                      Videography: {event?.videography ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-blue-600 text-white btn rounded hover:bg-blue-700"
                    onClick={() => handleCheckAvailabilityClick(event)}
                  >
                    Check Availability
                  </button>
                  <Link to={`/events/${event?._id}`} className="btn">
                    Customize Plan
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DatePickerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        onConfirm={handleConfirmDate}
      />
    </div>
  );
};

export default EventCard;