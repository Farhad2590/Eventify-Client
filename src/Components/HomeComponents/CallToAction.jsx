
const CallToAction = () => {
    return (
        <div className="bg-cta my-10 rounded-lg p-10 gap-5 flex flex-col lg:flex-row items-center justify-between">
            <div className="space-y-5">
                <h3 className="text-7xl text-black font-medium">Planning for something ?</h3>
                <p className="text-4xl text-black">Let us complete it for you</p>
                <button className="btn bg-pink-400 flex-nowrap px-7 py-5 text-white border-none text-lg">Book Now</button>
            </div>
            <div className="flex  justify-between gap-10">
                <img className="h-60 w-60 rounded-full border shadow-pink-400 shadow-md  cta1" alt="" />
                <img className="h-60 w-60 rounded-full border shadow-pink-400 shadow-md  cta2" alt="" />
                <img className="h-60 w-60 rounded-full border shadow-pink-400 shadow-md  cta3" alt="" />

            </div>
        </div>
    );
};

export default CallToAction;