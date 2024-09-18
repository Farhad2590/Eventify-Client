import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

export default function Video({ channel, song, url, likes, comment, shares }) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const vidRef = useRef();

  const onVideoClick = () => {
    if (isVideoPlaying) {
      vidRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      vidRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-full">
      <video
        onClick={onVideoClick}
        className="w-full h-full object-cover"
        ref={vidRef}
        src={url}
        loop
      />
      <div className="absolute inset-0 flex justify-center items-center">
        {!isVideoPlaying ? (
          <FaPlay
            className="text-white text-4xl cursor-pointer"
            onClick={onVideoClick}
          />
        ) : (
          <FaPause
            className="text-white text-4xl cursor-pointer"
            onClick={onVideoClick}
          />
        )}
      </div>
    </div>
  );
}
