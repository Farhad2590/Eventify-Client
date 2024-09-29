import { Link } from "@material-ui/core";
import { useEffect, useState } from "react";

const EventCards = () => {
  const [events, setEvents] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCheckAvailabilityClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSidebarOpen(false);
  };

  // Remove duplicate categories
  const uniqueCategories = [...new Set(events.map(event => event.category))];

  // Filter events based on selected category
  const filteredEvents = selectedCategory
    ? events.filter(event => event.category === selectedCategory)
    : events;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white text-black transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:w-64 lg:flex-shrink-0 p-4`}
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
          {uniqueCategories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer mb-4 hover:bg-blue-600 hover:text-white p-2 rounded-md"
            >
              {category}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setSelectedCategory(null)}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Show All Events
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4 ml-0 lg:ml-64">
        <button
          onClick={toggleSidebar}
          className="text-black mb-6 lg:hidden text-4xl fixed top-4 left-4"
          aria-label="Open Sidebar"
        >
          <i className="bi bi-filter-left"></i>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col"
              style={{ height: '630px' }}
            >
              <img
                src={event.carrt_Image}
                alt={event.package_name}
                className="w-full h-48 p-3 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-semibold">
                      {event.package_name}
                    </h3>
                    <p className="text-gray-600 font-bold">
                      ${event.price}
                    </p>
                  </div>
                  <ul className="mb-4">
                    {event.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-sm text-gray-500"
                      >
                        - {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="text-center">Team Size</p>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">
                      Photography: {event.photography_team_size}
                    </p>
                    <p className="text-sm text-gray-600">
                      Videography: {event.videography ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={handleCheckAvailabilityClick}
                  >
                    Check Availability
                  </button>

                  <Link to={`/customizePlan/${event.package_name}`}>
                    <button className="btn">
                      Customize Plan
                    </button>
                  </Link>


                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4">Select a Date</h2>
            <div className="calendar">
              <p>Your Calendar Component Here</p>
            </div>
            <button
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCards;