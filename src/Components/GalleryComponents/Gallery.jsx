import LightGallery from 'lightgallery/react';
import { useEffect, useState } from 'react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';
import TitleAndSubheading from '../../Shared/TitleAndSubheading';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export function Gallery() {
  const [images, setImages] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/gallery`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setImages(response.data[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gallery images:", error);
        setLoading(false);
      });
  }, [axiosSecure]);

  const onInit = () => {
    console.log('lightGallery has been initialized');
  };

  const filteredImages =
    selectedCategory === 'All'
      ? Object.entries(images)
          .filter(([key]) => key !== '_id')
          .flatMap(([, value]) => value)
      : images[selectedCategory] || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <TitleAndSubheading title="Image Gallery" />
      <div className="flex flex-wrap justify-center space-x-2 space-y-2 sm:space-x-4 mb-6">
        <button
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg ${selectedCategory === 'All'
            ? 'bg-blue-600 text-white hover:text-white'
            : 'bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700'
            }`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        <button
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg ${selectedCategory === 'Wedding'
            ? 'bg-blue-600 text-white hover:text-white'
            : 'bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700'
            }`}
          onClick={() => setSelectedCategory('Wedding')}
        >
          Wedding
        </button>
        <button
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg ${selectedCategory === 'Concert'
            ? 'bg-blue-600 text-white hover:text-white'
            : 'bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700'
            }`}
          onClick={() => setSelectedCategory('Concert')}
        >
          Concert
        </button>
        <button
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg ${selectedCategory === 'Birthdays'
            ? 'bg-blue-600 text-white hover:text-white'
            : 'bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700'
            }`}
          onClick={() => setSelectedCategory('Birthdays')}
        >
          Birthdays
        </button>
        <button
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg ${selectedCategory === 'Festival'
            ? 'bg-blue-600 text-white hover:text-white'
            : 'bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700'
            }`}
          onClick={() => setSelectedCategory('Festival')}
        >
          Festival
        </button>
        <button
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg ${selectedCategory === 'Newyear'
            ? 'bg-blue-600 text-white hover:text-white'
            : 'bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700'
            }`}
          onClick={() => setSelectedCategory('Newyear')}
        >
          Newyear
        </button>
        <button
          className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg ${selectedCategory === 'Conference'
            ? 'bg-blue-600 text-white hover:text-white'
            : 'bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700'
            }`}
          onClick={() => setSelectedCategory('Conference')}
        >
          Conference
        </button>
      </div>

      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare]}
        elementClassNames="columns-3 gap-2.5" // This replaces .lg-react-element styles
      >
        {filteredImages.map((image, index) => (
          <a href={image.src} key={index} className="block pb-2.5">
            <img 
              alt={image.alt} 
              src={image.src} 
              className="max-w-full block py-1.5 rounded-[20px] transition-transform duration-200 hover:opacity-90 hover:scale-[1.01]"
            />
          </a>
        ))}
      </LightGallery>
    </div>
  );
}