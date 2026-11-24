import React from 'react';
import TrackCard from './TrackCard';

const CategorySection = ({ category, tracks, viewAll }) => {
  return (
    <div className="mb-6 bg-white rounded-lg p-6 shadow-md" dir="rtl">
      <h2 className="text-3xl font-bold mb-4 text-right font-vazirmatn">{category}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4"> {/* تنظیم گرید برای ۶ ستون */}
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
      <button
        className="mt-4 text-blue-500 hover:text-blue-700 transition duration-300"
        onClick={viewAll}
      >
        مشاهده همه
      </button>
    </div>
  );
};

export default CategorySection;
