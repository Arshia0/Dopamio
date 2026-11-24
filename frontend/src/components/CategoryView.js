import { apiUrl } from "../utils/api";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import TrackCard from './TrackCard';

const CategoryView = () => {
  const [tracks, setTracks] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    fetchAllTracks();
  }, [categoryName]);

  const fetchAllTracks = async () => {
    try {
      const response = await axios.get(apiUrl('/api/users/music/'));
      const filteredTracks = response.data.filter(track => track.category === categoryName);
      setTracks(filteredTracks);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100" dir="rtl">
      <Link to="/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block font-vazirmatn">
        ← بازگشت به صفحه اصلی
      </Link>
      <h1 className="text-4xl font-bold mb-8 text-right font-vazirmatn">
        موسیقی‌های دسته {categoryName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"> {/* تنظیم گرید برای ۵ ستون */}
        {tracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default CategoryView;
