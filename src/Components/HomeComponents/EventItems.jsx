// import React from 'react';
import palki from '../../assets/HomeImages/palki.png'
import band from '../../assets/HomeImages/band.png'
import photo from '../../assets/HomeImages/photography.png'
import led from '../../assets/HomeImages/led.png'
import sound from '../../assets/HomeImages/sound.png'
import light from '../../assets/HomeImages/lighting.png'
import bday from '../../assets/HomeImages/birthday.png'
import ghora from '../../assets/HomeImages/ghora.png'
const EventItems = () => {
    return (
        <div className='mb-10'>
            <div>
                <h1 className='text-2xl font-bold lg:text-4xl text-center'>Our Popular Event Items</h1>
            </div>
            <div>
                <section className="m-4 md:m-8 bg-gray-100 text-gray-800">
                    <div className="container mx-auto p-4 my-6 space-y-2 text-center">
                        {/* <h2 className="text-5xl font-bold">Built to empower every team</h2>
		<p className="text-gray-600">Libero minima optio qui</p> */}
                    </div>
                    <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col items-center p-4">

                            <img src={palki} alt="" />
                            <h3 className="my-3 text-3xl font-semibold">Palki</h3>
                            <div className="space-y-1 leading-tight">
                                <p>Similique quas ea veniam</p>
                                <p>Tempore quasi porro</p>
                                <p>Blanditiis aut mollitia ex</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <img src={band} alt="" />
                            <h3 className="my-3 text-3xl font-semibold">Band Party</h3>
                            <div className="space-y-1 leading-tight">
                                <p>Similique quas ea veniam</p>
                                <p>Tempore quasi porro</p>
                                <p>Blanditiis aut mollitia ex</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <img src={photo} alt="" />
                            <h3 className="my-3 text-3xl font-semibold">Photography</h3>
                            <div className="space-y-1 leading-tight">
                                <p>Similique quas ea veniam</p>
                                <p>Tempore quasi porro</p>
                                <p>Blanditiis aut mollitia ex</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <img src={led} alt="" />
                            <h3 className="my-3 text-3xl font-semibold">Led Wall Screen</h3>
                            <div className="space-y-1 leading-tight">
                                <p>Similique quas ea veniam</p>
                                <p>Tempore quasi porro</p>
                                <p>Blanditiis aut mollitia ex</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <img src={sound} alt="" />
                            <h3 className="my-3 text-3xl font-semibold">Sound System</h3>
                            <div className="space-y-1 leading-tight">
                                <p>Similique quas ea veniam</p>
                                <p>Tempore quasi porro</p>
                                <p>Blanditiis aut mollitia ex</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-4">
                           <img src={light} alt="" />
                            <h3 className="my-3 text-3xl font-semibold">Lighting System</h3>
                            <div className="space-y-1 leading-tight">
                                <p>Similique quas ea veniam</p>
                                <p>Tempore quasi porro</p>
                                <p>Blanditiis aut mollitia ex</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-4">
                           <img src={bday} alt="" />
                            <h3 className="my-3 text-3xl font-semibold">Birthday Decoration</h3>
                            <div className="space-y-1 leading-tight">
                                <p>Similique quas ea veniam</p>
                                <p>Tempore quasi porro</p>
                                <p>Blanditiis aut mollitia ex</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-4">
                           <img src={ghora} alt="" />
                            <h3 className="my-3 text-3xl font-semibold">Ghorar Gari</h3>
                            <div className="space-y-1 leading-tight">
                                <p>Similique quas ea veniam</p>
                                <p>Tempore quasi porro</p>
                                <p>Blanditiis aut mollitia ex</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EventItems;