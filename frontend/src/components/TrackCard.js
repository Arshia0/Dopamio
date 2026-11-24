import React from 'react';

const TrackCard = ({ track }) => {
  return (
    <div className="bg-gray-200 rounded-lg p-4 w-56 flex-none"> {/* تغییر اندازه کارت */}
      <img src={track.image} alt={track.title} className="w-full h-56 object-cover rounded-lg mb-4" /> {/* تغییر اندازه تصویر */}
      <h3 className="text-lg font-bold truncate">{track.title}</h3>
      <p className="text-gray-600 truncate">خواننده: {track.author}</p>
      <p className="text-gray-600">{track.publication_year}</p>
      <audio controls src={track.music_file} className="w-full mt-2" />
      <a
        href={track.music_file}
        download
        className="mt-2 block text-blue-500 hover:text-blue-700 transition duration-300"
      >
        دانلود
      </a>
    </div>
  );
};

export default TrackCard;
