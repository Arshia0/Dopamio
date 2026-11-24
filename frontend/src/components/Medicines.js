import { apiUrl } from "../utils/api";
import React, { useState, useEffect } from "react";
import axios from "axios";

const MedicinePage = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(apiUrl("/api/users/medicines/"));
        setMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, []);

  const openPopup = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const closePopup = () => {
    setSelectedMedicine(null);
  };

  return (
    <div className="min-h-screen py-10 px-4 font-vazirmatn text-right" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-center">داروها</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={medicine.image || "/default_image.png"}
              alt={medicine.name}
              className="h-64 w-full object-cover mb-4 cursor-pointer rounded-lg"
              onClick={() => openPopup(medicine)}
            />
            <h2
              className="text-xl font-bold mb-2 cursor-pointer text-blue-600 hover:underline"
              onClick={() => openPopup(medicine)}
            >
              {medicine.name}
            </h2>
            <div className="flex flex-wrap justify-start">
              {medicine.tags.map((tag) => (
                <span key={tag} className="bg-blue-500 text-white py-1 px-3 rounded-lg m-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedMedicine && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" dir="rtl">
          <div className="relative p-4 w-full max-w-2xl max-h-full animate-fadeIn">
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
                src={selectedMedicine.image || "/default_image.png"}
                alt={selectedMedicine.name}
                className="w-full rounded-lg mb-4 max-h-64 object-contain"
              />
              <h2 className="text-2xl font-bold mb-4">{selectedMedicine.name}</h2>
              <p className="text-gray-600 mb-4">{selectedMedicine.description}</p>
              <p className="text-gray-800">
                این دارو{" "}
                {selectedMedicine.prescription_required
                  ? "نیاز به تجویز پزشک دارد."
                  : "بدون نیاز به تجویز پزشک قابل مصرف است."}
              </p>
              <div className="text-center mt-4">
                <button
                  onClick={closePopup}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicinePage;
