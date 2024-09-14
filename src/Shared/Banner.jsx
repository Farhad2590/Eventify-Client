import bg from '../assets/Banner/Banner.jpeg'


const Banner = () => {
    return (
        <div
            id="home"
            className="w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center -translate-y-[5rem] relative"
            style={{
                backgroundImage: `url(${bg})`
            }}

        >
            <div className="text-center text-white">
                <p className="font-bold text-2xl">LETS CELEBRATE WITH</p>
                <h1 className="font-semibold text-6xl sm:text-8xl py-3 font-serif gradient-text">EVENTIFY</h1>
                <p className="font-bold text-xl">and Create Special Moments</p>
                <button className="rounded-full uppercase bg-white px-10 py-4 text-xl text-black font-semibold hover:text-white hover:bg-darkRed my-10 transition-all duration-500 ease-in-out">
                    READ MORE
                </button>
            </div>
            <div className="absolute z-50 px-5 lg:px-14 xl:px-44 w-full -bottom-40 sm:-bottom-16 left-1/2 -translate-x-1/2">
                <div className="lg:flex gap-5 items-center rounded-xl lg:rounded-full shadow-md bg-white px-5 sm:px-10 lg:px-20 py-5 w-full">
                    <div className="lg:w-[40%] text-center lg:text-start">
                        <p className="text-xl sm:text-2xl font-medium">Total Event Done By </p>
                        <h1 className="text-3xl sm:text-5xl font-bold gradient-text">Eventify</h1>
                    </div>
                    <div className="lg:w-[60%] flex flex-wrap gap-10 lg:gap-0 justify-center lg:justify-around border-l-0 lg:border-l-2 border-gray-300">
                        <hr className="w-full lg:w-0.5 h-0.5 mt-6 lg:mt-0 lg:h-24 bg-gray-300 block lg:hidden" />
                        <div>
                            <div className="flex flex-wrap gap-5">
                                {[
                                    { value: 200, unit: 'Weadings', color: 'text-green-800' },
                                    { value: 95, unit: 'Birthdays', color: 'text-red-800' },
                                    { value: 71, unit: 'Conferance', color: 'text-yellow-500' },
                                    { value: 25, unit: 'Concerts', color: 'text-green-400' },
                                ].map((item, index) => (
                                    <div key={index} className={item.color}>
                                        <h1 className="text-4xl sm:text-6xl font-bold">{item.value}</h1>
                                        <p className="font-semibold pt-1 text-center">{item.unit}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;