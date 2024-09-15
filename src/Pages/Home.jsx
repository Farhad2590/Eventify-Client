import Banner from "../Components/HomeComponents/Banner";
import CallToAction from "../Components/HomeComponents/CallToAction";
import OurEvents from "../Components/HomeComponents/OurEvents";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurEvents></OurEvents>
            <CallToAction></CallToAction>
        </div>
    );
};

export default Home;