import Banner from "../Shared/Banner";
import EventItems from "./EventItems";
import Faq from "./Faq";
import Testimonial from "./Testimonial";

const Home = () => {
    return (
        <div>
            <Banner />
            <Faq></Faq>
            <Testimonial></Testimonial>
            <EventItems></EventItems>
        </div>
    );
};

export default Home;