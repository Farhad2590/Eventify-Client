import { Rating, ThinRoundedStar } from "@smastrom/react-rating";

const TestimonialCard = (review) => {

    const myStyles = {
        itemShapes: ThinRoundedStar,
        activeFillColor: '#3A86FF',
        inactiveFillColor: '#3A86FF50',
    }


    return (
        <div className="bg-gray-100 p-4 rounded-lg  shadow-md flex flex-col justify-between  items-center min-h-80">
            <img src={'https://i.ibb.co/ScLz5b5/pic1.jpg'} alt={review?.user_name} className="w-20 h-20 rounded-full mb-4" />
            <div className="flex items-center mb-2 space-x-2 dark:text-yellow-700">
                <Rating
                style={{ maxWidth: 180 }}
                    itemStyles={myStyles}
                    value={review?.rating}
                    readOnly
                />
            </div>
            <p className="text-gray-700 text-center flex-grow mb-4">{review?.review}</p>
            <p className="font-bold text-blue-600">{review?.user_name}</p>
            <p className="text-sm text-gray-600">{review?.event_name}</p>
        </div>
    );
};

export default TestimonialCard;