import React, { useState, useEffect } from "react";
import morningIcon from "../images/morningIcon.png";
import afternoonIcon from "../images/afternoonIcon.png";
import nightIcon from "../images/nightIcon.png";

const PostponePopup = ({ isOpen, closePopup, selectedDate, setSelectedDate, handleTimeSelection }) => {
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("morning");

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 30];

  useEffect(() => {
    switch (selectedTimeOfDay) {
      case "morning":
        setSelectedHour(8);
        setSelectedMinute(0);
        break;
      case "afternoon":
        setSelectedHour(16);
        setSelectedMinute(0);
        break;
      case "night":
        setSelectedHour(21);
        setSelectedMinute(0);
        break;
      default:
        break;
    }
  }, [selectedTimeOfDay]);

  if (!isOpen) return null;

  const handleTimeChange = (e) => {
    const [hour, minute] = e.target.value.split(":");
    setSelectedHour(parseInt(hour));
    setSelectedMinute(parseInt(minute));
  };

  const handleTimeOfDaySelection = (timeOfDay) => {
    setSelectedTimeOfDay(timeOfDay);
    let hour = 8, minute = 0;

    if (timeOfDay === "afternoon") {
      hour = 16;
    } else if (timeOfDay === "night") {
      hour = 21;
    }

    setSelectedHour(hour);
    setSelectedMinute(minute);
  };

  const handleConfirm = () => {
    const selectedClock = `${selectedHour}:${selectedMinute}:00`; // قالب‌بندی clock به شکل HH:mm:ss
    handleTimeSelection(selectedTimeOfDay, selectedClock); // ارسال clock
    closePopup(); // بستن پاپ‌آپ بعد از تایید
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" dir="rtl">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md font-vazirmatn">
        <h2 className="text-2xl font-semibold text-center mb-4">انتخاب زمان</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">انتخاب روز:</label>
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">انتخاب ساعت:</label>
          <select
            value={`${selectedHour}:${selectedMinute}`}
            onChange={handleTimeChange}
            className="p-2 border border-gray-300 rounded w-full"
          >
            {hours.map((hour) =>
              minutes.map((minute) => (
                <option key={`${hour}:${minute}`} value={`${hour}:${minute}`}>
                  {`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">انتخاب زمان روز:</label>
          <div className="flex justify-between">
            <button
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                selectedTimeOfDay === "morning" ? "bg-blue-600 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => handleTimeOfDaySelection("morning")}
            >
              <img src={morningIcon} alt="صبح" className="w-6 h-6 ml-2" />
              صبح
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                selectedTimeOfDay === "afternoon" ? "bg-blue-600 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => handleTimeOfDaySelection("afternoon")}
            >
              <img src={afternoonIcon} alt="ظهر" className="w-6 h-6 ml-2" />
              ظهر
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                selectedTimeOfDay === "night" ? "bg-blue-600 text-white" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => handleTimeOfDaySelection("night")}
            >
              <img src={nightIcon} alt="شب" className="w-6 h-6 ml-2" />
              شب
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleConfirm} // دکمه تایید برای ارسال اطلاعات
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mr-2"
          >
            تایید
          </button>
          <button
            onClick={closePopup}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostponePopup;
