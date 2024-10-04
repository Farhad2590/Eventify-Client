import { useState, useRef, useEffect } from 'react';
import { FaAngleDown } from "react-icons/fa";

const CustomDropdown = ({ onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('One');
  const dropdownRef = useRef(null);

  const options = ['One', 'Two', 'Three', 'Four', 'Five'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSave = () => {
    setIsOpen(false);  
    if (typeof onSave === 'function') {
      onSave(selectedOption);  
    } else {
      console.log('Selected option:', selectedOption); 
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-48 font-sans" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {selectedOption}
        <FaAngleDown className="absolute right-2 top-2.5 w-5 h-5 text-gray-400" />
      </button>
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option, index) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                option === selectedOption ? 'bg-blue-50' : ''
              }`}
            >
              {option}
            </div>
          ))}
          <div className="px-4 py-2 border-t border-gray-300">
            <button
              onClick={handleSave}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              SAVE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;