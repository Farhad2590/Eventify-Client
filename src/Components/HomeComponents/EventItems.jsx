import { FaLocationArrow } from "react-icons/fa";
import TitleAndSubheading from '../../Shared/TitleAndSubheading';

const eventItems = [
    {
        id: 1,
        name: 'Palki',
        image: 'https://i.ibb.co.com/dtThxc2/palki.png',
        features: ['Traditional design', 'Comfortable seating', 'Skilled carriers']
    },
    {
        id: 2,
        name: 'Band Party',
        image: 'https://i.ibb.co.com/MgxtpV5/band.png',
        features: ['Diverse music genres', 'Professional musicians', 'Custom playlists']
    },
    {
        id: 3,
        name: 'Photography',
        image: 'https://i.ibb.co.com/DfdV9SY/photography.png',
        features: ['High-quality equipment', 'Experienced photographers', 'Custom photo albums']
    },
    {
        id: 4,
        name: 'Led Wall Screen',
        image: 'https://i.ibb.co.com/Xt3mkRT/led.png',
        features: ['High resolution display', 'Customizable content', 'Various sizes available']
    },
    {
        id: 5,
        name: 'Sound System',
        image: 'https://i.ibb.co.com/L0nzs6B/sound.png',
        features: ['Crystal clear audio', 'Professional setup', 'Scalable for any venue']
    },
    {
        id: 6,
        name: 'Lighting System',
        image: 'https://i.ibb.co.com/jkqLwnC/lighting.png',
        features: ['Mood-setting ambiance', 'Programmable effects', 'Energy-efficient LEDs']
    },
    {
        id: 7,
        name: 'Birthday Decoration',
        image: 'https://i.ibb.co.com/ccJqv7g/birthday.png',
        features: ['Themed designs', 'Balloon arrangements', 'Personalized banners']
    },
    {
        id: 8,
        name: 'Ghorar Gari',
        image: 'https://i.ibb.co.com/pW86RVn/ghora.png',
        features: ['Elegant horse-drawn carriage', 'Experienced handler', 'Romantic experience']
    },
];

const EventItem = ({ name, image, features }) => (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
        <div className="w-32 h-32 mb-4 overflow-hidden rounded-full">
            <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <h3 className="mb-3 text-xl md:text-2xl text-blue-600 font-semibold text-center">{name}</h3>
        <div className="space-y-2 leading-tight text-sm text-gray-600 w-full">
            {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                    <FaLocationArrow
                        className="w-4 h-4 mr-2 text-blue-600" />
                    <p>{feature}</p>
                </div>
            ))}
        </div>
    </div>
);

const EventItems = () => {
    return (
        <div className="mb-10 px-4 md:px-8">
            <TitleAndSubheading title="Our Popular Event Items" />
            <div className="container mx-auto">
                <section className=" text-gray-800 py-8 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {eventItems.map((item) => (
                            <EventItem key={item.id} name={item.name} image={item.image} features={item.features} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EventItems;