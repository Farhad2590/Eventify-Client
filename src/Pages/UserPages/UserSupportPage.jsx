import { useState } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";

const UserSupportPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className=" text-white min-h-screen p-6">

            <TitleAndSubheading title="Support Center" subheading="We're here to help! Find answers or reach out for assistance."></TitleAndSubheading>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-black">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <div className="bg-blue-600 p-4 rounded-lg">
                        <h3 className="font-bold">How do I book an event?</h3>
                        <p className="text-white">
                            To book an event, go to the Events page and select the event you wish to attend.
                        </p>
                    </div>
                    <div className="bg-blue-600 p-4 rounded-lg">
                        <h3 className="font-bold">Can I cancel my booking?</h3>
                        <p className="text-white">
                            Yes, you can cancel your booking up to 24 hours before the event starts.
                        </p>
                    </div>
                    <div className="bg-blue-600 p-4 rounded-lg">
                        <h3 className="font-bold">How can I provide feedback?</h3>
                        <p className="text-white">
                            You can provide feedback through your user profile or by contacting support.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-black">Contact Support</h2>
                <div className="bg-blue-600 p-6 rounded-lg flex flex-col md:flex-row md:justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                        <FaPhoneAlt className="text-blue-600 mr-3" size={24} />
                        <div>
                            <h3 className="font-bold">Phone Support</h3>
                            <p className="text-white">Call us at: (123) 456-7890</p>
                        </div>
                    </div>
                    <div className="flex items-center mb-4 md:mb-0">
                        <FaEnvelope className="text-blue-600 mr-3" size={24} />
                        <div>
                            <h3 className="font-bold">Email Support</h3>
                            <p className="text-white">Email us at: support@example.com</p>
                        </div>
                    </div>
                    <button
                        className="mt-4 md:mt-0 bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                        onClick={toggleModal}
                    >
                        Open Contact Form
                    </button>
                </div>
            </section>



            {/* Modal for Contact Form */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg">
                        <h3 className="text-xl font-bold mb-4 text-blue-600">Contact Us</h3>
                        <form>
                            <div className="mb-4">
                                <label className="block text-blue-600 mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="bg-gray-200 text-blue-600 rounded px-4 py-2 w-full"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-blue-600 mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-200 text-blue-600 rounded px-4 py-2 w-full"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-blue-600 mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    className="bg-gray-200 text-blue-600 rounded px-4 py-2 w-full h-32"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                                    onClick={toggleModal}
                                >
                                    Send
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-700 text-white font-semibold px-4 py-2 rounded hover:bg-gray-600 ml-2"
                                    onClick={toggleModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSupportPage;
