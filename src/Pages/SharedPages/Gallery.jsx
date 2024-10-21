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

// import plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';
import TitleAndSubheading from '../../Shared/TitleAndSubheading';
import useAxiosSecure from '../../hooks/useAxiosSecure';

export function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Wedding', 'Concert', 'Birthdays', 'Festival', 'Newyear', 'Conference'];

  useEffect(() => {
    axiosSecure
      .get('/gallery')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setImages(response.data);
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

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(image => image.Category === selectedCategory);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-4">
      <TitleAndSubheading title="Image Gallery" />
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-blue-600 hover:text-white text-gray-700'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <LightGallery
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare]}
        elementClassNames="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {filteredImages.map((image, index) => (
          <a 
            href={image.src} 
            key={index} 
            className="block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img 
              alt={image.alt} 
              src={image.src} 
              className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-105"
            />
          </a>
        ))}
      </LightGallery>
    </div>
  );
}