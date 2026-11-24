import { apiUrl } from "../utils/api";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategorySection from './CategorySection';

const MusicList = () => {
  const [allMusic, setAllMusic] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    try {
      const response = await axios.get(apiUrl('/api/users/music/'));
      setAllMusic(response.data);

      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(track => track.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  };

  const getMusicByCategory = (category) => {
    return allMusic.filter(track => track.category === category).slice(0, 5);
  };

  const viewAll = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="p-8 min-h-screen text-right font-vazirmatn" dir="rtl">
      <h1 className="text-4xl font-bold mb-8">موسیقی‌ها</h1>
      {categories.map((category) => (
        <CategorySection
          key={category}
          category={category}
          tracks={getMusicByCategory(category)}
          viewAll={() => viewAll(category)}
        />
      ))}
    </div>
  );
};

export default MusicList;
