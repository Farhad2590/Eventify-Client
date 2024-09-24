import { FaFacebookF, FaTwitter, FaInstagram, FaCalendarAlt, FaEnvelope, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-600  text-white py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-4xl font-bold italic">Eventify</h2>
            <p className="text-sm mt-2 font-light">Crafting Unforgettable Moments</p>
          </div>
          <div className="flex space-x-4">
            {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, index) => (
              <a key={index} href="#" className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors" aria-label={`Social Media ${index + 1}`}>
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <FaCalendarAlt className="mx-auto mb-4" size={32} />
            <h3 className="font-semibold mb-2">Plan Your Event</h3>
            <p className="text-sm">Let's create something spectacular together</p>
          </div>
          <div className="text-center">
            <FaMapMarkerAlt className="mx-auto mb-4" size={32} />
            <h3 className="font-semibold mb-2">Find Us</h3>
            <p className="text-sm">123 Event Avenue, Party City, 90210</p>
          </div>
          <div className="text-center">
            <FaTicketAlt className="mx-auto mb-4" size={32} />
            <h3 className="font-semibold mb-2">Get Tickets</h3>
            <p className="text-sm">Secure your spot at our next big event</p>
          </div>
        </div>
        
        <div className="text-center">
          <a href="mailto:info@eventify.com" className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">
            <FaEnvelope className="mr-2" />
            <span>info@eventify.com</span>
          </a>
        </div>
        
        <div className="mt-8 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Eventify. All rights reserved.</p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 border-4 border-white transform rotate-12"></div>
      </div>
    </footer>
  );
};

export default Footer;