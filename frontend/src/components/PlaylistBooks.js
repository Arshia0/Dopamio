import { apiUrl } from "../utils/api";
import React, { useEffect, useState } from "react";
import axios from "axios";

const BookPodcastList = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get(apiUrl("/api/users/books-podcasts/"))
      .then((response) => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const openPopup = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  return (
    <div className="p-8 min-h-screen text-right font-vazirmatn" dir="rtl">
      <h1 className="text-4xl font-bold mb-8">کتاب‌ها</h1>

      {/* بخش کتاب‌ها */}
      <div className="mb-6 bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-3xl font-bold mb-4">کتاب‌های پیشنهادی</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {items.filter((item) => item.category === "book").map((item) => (
            <div
              key={item.id}
              className="bg-gray-200 rounded-lg p-4 cursor-pointer"
              onClick={() => openPopup(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-600">نویسنده: {item.author}</p>
              <p className="text-gray-600">{item.publication_year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* پاپ‌آپ جدید */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-[#21edad] rounded-lg shadow-lg text-black p-8 overflow-y-auto" style={{ maxHeight: "90vh" }}>
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
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full rounded-lg mb-4 max-h-64 object-contain"
              />
              <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>
              <p className="mb-4">نویسنده: {selectedItem.author}</p>
              <p className="mb-4">سال انتشار: {selectedItem.publication_year}</p>
              <p>{selectedItem.about}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPodcastList;
