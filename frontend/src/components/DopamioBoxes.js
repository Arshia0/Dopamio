import { apiUrl } from "../utils/api";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'react-lottie-player';
import AnimationGradientBox02 from '../lottie/Animationgradientbox02.json';
import DopamioBoxesAnimation from '../lottie/dopamioboxesanimation01.json';

const DopamioBoxes = () => {
  const boxesPerPage = 8;
  const [boxes, setBoxes] = useState([]);
  const [currentPageBoxes, setCurrentPageBoxes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        const response = await axios.get(apiUrl('/api/users/bells/'));
        setBoxes(response.data);
        setCurrentPageBoxes(response.data.slice(0, boxesPerPage));
      } catch (error) {
        console.error('Error fetching boxes:', error);
      }
    };

    fetchBoxes();
  }, []);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    const offset = selectedPage * boxesPerPage;
    setCurrentPage(selectedPage);
    setCurrentPageBoxes(boxes.slice(offset, offset + boxesPerPage));
  };

  const filteredBoxes = currentPageBoxes.filter((box) =>
    box.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(boxes.length / boxesPerPage);

  return (
    <div className="p-6 font-vazirmatn text-right min-h-screen mt-20 flex flex-col items-center">
      <div className="w-full max-w-7xl mb-8 bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 w-full">
          <Lottie
            loop
            animationData={DopamioBoxesAnimation}
            play
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2 w-full mt-6 md:mt-0 text-right" dir="rtl">
          <h2 className="text-blue-700 font-semibold text-lg font-vazirmatn">درباره دوپامیو</h2>
          <h3 className="text-2xl font-bold mt-2 font-vazirmatn">مدیریت تسک‌های شخصی‌سازی شده</h3>
          <p className="text-gray-700 mt-4 font-vazirmatn">
            دوپامیو یک نرم‌افزار خودیاری پیشرفته است که به منظور ارتقاء سلامتی روانی شما طراحی شده است. با ارائه تسک‌های مختلف، کاربران می‌توانند سطح دوپامین بدن خود را از طریق نمودارهای گرافیکی نظارت کنند و ببینند آیا به تعادل سالم دست یافته‌اند یا خیر.
          </p>
        </div>
      </div>

      <div className="mb-6 w-full max-w-7xl">
        <input
          type="text"
          placeholder="... جستجو"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-right font-vazirmatn"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {filteredBoxes.map((box) => (
          <Link
            key={box.id}
            to={`/bell/${box.id}`}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
          >
            <div className="h-56 flex items-center justify-center">
              <Lottie
                loop
                animationData={AnimationGradientBox02}
                play
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4" dir="rtl">
              <h3 className="text-lg font-bold text-blue-600 font-vazirmatn">{box.name}</h3>
              <p className="text-gray-600 mt-2 font-vazirmatn">{box.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center w-full max-w-7xl">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() =>
              handlePageClick({ selected: Math.max(0, currentPage - 1) })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              ></path>
            </svg>
            قبلی
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${
                  i === currentPage
                    ? "bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20"
                    : ""
                }`}
                onClick={() => handlePageClick({ selected: i })}
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  {i + 1}
                </span>
              </button>
            ))}
          </div>
          <button
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={() =>
              handlePageClick({
                selected: Math.min(pageCount - 1, currentPage + 1),
              })
            }
          >
            بعدی
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DopamioBoxes;
