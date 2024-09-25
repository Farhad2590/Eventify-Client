
import EventItems from "../Components/HomeComponents/EventItems";
import Faq from "../Components/HomeComponents/Faq";
import Testimonial from "../Components/HomeComponents/Testimonial";
import Banner from "../Components/HomeComponents/Banner";
import CallToAction from "../Components/HomeComponents/CallToAction";
import OurEvents from "../Components/HomeComponents/OurEvents";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurEvents></OurEvents>
            <EventItems></EventItems>
            <CallToAction></CallToAction>
            <Testimonial></Testimonial>
            <Faq></Faq>
        </div>
    );
};

export default Home;