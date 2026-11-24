import { apiUrl } from "../utils/api";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); // مدیریت پاپ‌آپ

  useEffect(() => {
    axios.get(apiUrl("/api/users/movies/"))
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const openPopup = (movie) => {
    setSelectedMovie(movie); // ذخیره فیلم انتخاب شده برای نمایش در پاپ‌آپ
  };

  const closePopup = () => {
    setSelectedMovie(null); // بستن پاپ‌آپ
  };

  return (
    <div className="p-8 min-h-screen text-right font-vazirmatn" dir="rtl">
      <h1 className="text-4xl font-bold mb-8">فیلم‌ها</h1>

      {/* بخش فیلم‌های پیشنهادی */}
      <div className="mb-6 rounded-lg p-6 shadow-md">
        <h2 className="text-3xl font-bold mb-4">فیلم‌های پیشنهادی</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-200 rounded-lg p-4 cursor-pointer"
              onClick={() => openPopup(movie)} // باز کردن پاپ‌آپ با اطلاعات فیلم
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-80 object-cover rounded-lg mb-4" // تنظیم اندازه و نسبت تصویر
              />
              <h3 className="text-lg font-bold text-left">{movie.title}</h3> {/* متن چپ‌چین برای عنوان */}
              <p className="text-gray-600">کارگردان: {movie.director}</p>
              <p className="text-gray-600">بازیگران: {movie.actors}</p>
              <p className="text-gray-600">{movie.publication_year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* پاپ‌آپ اطلاعات فیلم */}
      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-lg text-black p-8 overflow-y-auto" style={{ maxHeight: "90vh" }}>
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-black bg-transparent hover:bg-gray-300 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">بستن</span>
              </button>
              <img
                src={selectedMovie.image}
                alt={selectedMovie.title}
                className="w-full rounded-lg mb-4 max-h-64 object-contain"
              />
              <h2 className="text-2xl font-bold mb-4 text-left">{selectedMovie.title}</h2> {/* متن چپ‌چین برای عنوان */}
              <p className="mb-4">کارگردان: {selectedMovie.director}</p>
              <p className="mb-4">بازیگران: {selectedMovie.actors}</p>
              <p className="mb-4">سال انتشار: {selectedMovie.publication_year}</p>
              <p>{selectedMovie.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
