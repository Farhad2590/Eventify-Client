import cta1 from '../../assets/HomeImages/cta1.png'
import cta2 from '../../assets/HomeImages/cta2.png'
import cta3 from '../../assets/HomeImages/cta3.png'
import Button_Customize from '../../Shared/Button_Customize';
const CallToAction = () => {
    
    return (
        <div className="bg-cta my-10 rounded-lg p-10 gap-5 flex flex-col lg:flex-row items-center justify-between">
            <div className="space-y-5">
                <h3 className="text-7xl text-black font-medium">Planning for something ?</h3>
                <p className="text-4xl text-black">Let us complete it for you</p>
                <Button_Customize name="Book Now"></Button_Customize>
            </div>
            <div className="flex w-full flex-col items-center md:flex-row lg:flex-row justify-between gap-10">
                <img className="h-52 w-52 xl:h-60 xl:w-60 lg:h-40 lg:w-40 rounded-full border shadow-blue-600 shadow-md cta1"src={cta1} alt="" />
                <img className="h-52 w-52 xl:h-60 xl:w-60 lg:h-40 lg:w-40 rounded-full border shadow-blue-600 shadow-md  cta2" src={cta2} alt="" />
                <img className="h-52 w-52 xl:h-60 xl:w-60 lg:h-40 lg:w-40 rounded-full border shadow-blue-600 shadow-md  cta3" src={cta3} alt="" />

            </div>
        </div>
    );
};

export default CallToAction;