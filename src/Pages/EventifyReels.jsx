import Video from "../Components/ReelsComponents/Video/Video";

import Vid1 from "../assets/videos/vid1.mp4";
import Vid2 from "../assets/videos/vid2.mp4";
import Vid3 from "../assets/videos/vid3.mp4";
import Vid4 from "../assets/videos/vid4.mp4";
import Vid5 from "../assets/videos/vid5.mp4";
import Vid6 from "../assets/videos/vid6.mp4";
import Vid7 from "../assets/videos/vid7.mp4";
import Vid8 from "../assets/videos/vid8.mp4";
import Vid9 from "../assets/videos/vid9.mp4";
import Vid10 from "../assets/videos/vid10.mp4";

// import "./Eventify.css"; // Assuming custom styles here
import { useState } from "react";
import TitleAndSubheading from "../Shared/TitleAndSubheading";

export default function EventifyReels() {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const data = [
    { url: Vid1 },
    { url: Vid2 },
    { url: Vid3 },
    { url: Vid4 },
    { url: Vid5 },
    { url: Vid6 },
    { url: Vid7 },
    { url: Vid8 },
    { url: Vid9 },
    { url: Vid10 },
  ];

  return (
    <div className="w-full h-screen bg-white overflow-y-scroll snap-y snap-mandatory">
      <center>
      <TitleAndSubheading title="Reel Gallery"></TitleAndSubheading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-5 mb-5">
          {data.map((list, i) => (
            <div key={i} className="relative w-full h-[100%] overflow-hidden rounded-lg cursor-pointer">
              <Video
                url={list.url}
                isPlaying={currentPlaying === i}
                onPlay={() => setCurrentPlaying(i)} // Set the current video index as playing
              />
            </div>
          ))}
        </div>
      </center>
    </div>
  );
}
