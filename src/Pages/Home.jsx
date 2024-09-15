
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
            <CallToAction></CallToAction>
            <Faq></Faq>
            <Testimonial></Testimonial>
            <EventItems></EventItems>
        </div>
    );
};

export default Home;