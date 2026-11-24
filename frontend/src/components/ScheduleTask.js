import { apiUrl } from "../utils/api";
import React, { useState, useEffect, useContext } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dopamioIcon from "../images/dopi-icon.png";
import imgIcon from "../images/imgIcon.png";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import PostponePopup from "./selectdatePopup";

const ScheduleTask = ({ bell, isFromBellDetail = false, updateEventList }) => {
  const { authTokens } = useContext(AuthContext);
  const [postpone, setPostpone] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(bell?.start || new Date());
  const [time, setTime] = useState(bell?.time || "");
  const [experience, setExperience] = useState(bell?.experience || "");
  const [file, setFile] = useState(null);
  const [reminder, setReminder] = useState(bell?.reminder || false);
  const [bells, setBells] = useState([]);
  const [selectedBell, setSelectedBell] = useState(bell?.bell?.id || bell?.id || "");
  const [taskStatus, setTaskStatus] = useState(bell?.status || "pending");
  const [isEditing, setIsEditing] = useState(!!bell.id);

  useEffect(() => {
    const fetchBells = async () => {
      try {
        const response = await axios.get(apiUrl("/api/users/bells/"));
        setBells(response.data);
      } catch (error) {
        console.error("Error fetching bells:", error);
      }
    };

    fetchBells();
  }, []);

  useEffect(() => {
    if (bell && bell.bell && bells.length > 0) {
      const foundBell = bells.find((b) => b.id === bell.bell);
      if (foundBell) {
        setSelectedBell(foundBell.id);
        setIsEditing(true);
      }
    } else if (bell && bells.length > 0) {
      setSelectedBell(bell.id);
    }
  }, [bell, bells]);

  const handleTimeSelection = (timeOfDay, clock) => {
    setTime(timeOfDay);
    setSelectedDate(prevDate => {
        const newDate = new Date(prevDate);
        const [hour, minute] = clock.split(":");
        newDate.setHours(parseInt(hour), parseInt(minute), 0);
        return newDate;
    });
  };

  const handleSchedule = async () => {
    const taskData = {
      bell: selectedBell,
      date: selectedDate.toISOString().split("T")[0],
      time: calculateTimeBasedOnClock(selectedDate),
      clock: `${selectedDate.getHours()}:${selectedDate.getMinutes()}:00`,
      experience: experience,
      reminder: reminder,
      status: taskStatus,
    };

    try {
      const formData = new FormData();
      for (const key in taskData) {
        formData.append(key, taskData[key]);
      }

      if (file) {
        formData.append("file", file);
      }

      const url = bell && bell.id
        ? apiUrl(`/api/users/schedule-task/${bell.id}/`)
        : apiUrl(`/api/users/schedule-task/`);

      const method = bell && bell.id ? "put" : "post";

      await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      alert("Task saved successfully!");

      if (updateEventList) {
        updateEventList();
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(apiUrl(`/api/users/schedule-task/${bell.id}/`), {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      alert("Task deleted successfully!");

      if (updateEventList) {
        updateEventList();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSelect = (date) => {
    setSelectedDate(date);
  };

  const calculateTimeBasedOnClock = (date) => {
    const hours = date.getHours();
    if (hours < 12) return "morning";
    if (hours < 18) return "afternoon";
    return "evening";
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md font-vazirmatn text-right">
      <h2 className="text-2xl text-blue-600 mb-6 text-center">
        تنظیم زمان برای {bell?.title || bell?.bell?.name || "زنگ"}
      </h2>

      {isFromBellDetail && (
        <label className="block mb-4">
          <input
            type="checkbox"
            checked={postpone}
            onChange={() => setIsPopupOpen(true)}
            className="mr-2"
          />
          انتخاب زمان
        </label>
      )}

      {isFromBellDetail && (
        <PostponePopup
          isOpen={isPopupOpen}
          closePopup={() => setIsPopupOpen(false)}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleTimeSelection={handleTimeSelection}
        />
      )}

      <div className="mb-4">
        <label className="block mb-2">انتخاب زنگ:</label>
        <select
          value={selectedBell}
          onChange={(e) => setSelectedBell(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={isEditing}
        >
          <option value="">زنگ مورد نظر را انتخاب کنید</option>
          {bells.map((bellOption) => (
            <option key={bellOption.id} value={bellOption.id}>
              {bellOption.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">تجربه:</label>
        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block mb-2">یادآور:</label>
        <div className="inline-flex items-center">
          <label className="flex items-center cursor-pointer relative">
            <input
              type="checkbox"
              checked={reminder}
              onChange={() => setReminder(!reminder)}
              className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-pink-600 checked:border-pink-600"
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </span>
          </label>
          <span className="ml-2">تنظیم یادآور</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">آپلود فایل:</label>
        <div className="flex items-center">
          <input type="file" onChange={handleFileUpload} className="hidden" id="fileUpload" />
          <label htmlFor="fileUpload" className="cursor-pointer">
            <img src={imgIcon} alt="آیکون آپلود" className="w-12 h-12" />
          </label>
          {file && <span className="ml-2">{file.name}</span>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">انجام شد:</label>
        <div className="inline-flex items-center">
          <label className="flex items-center cursor-pointer relative">
            <input
              type="checkbox"
              checked={taskStatus === "done"}
              onChange={() => setTaskStatus(taskStatus === "done" ? "pending" : "done")}
              className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-pink-600 checked:border-pink-600"
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </span>
          </label>
          <span className="ml-2">انجام دادم</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleSchedule}
          className="py-2 px-6 bg-blue-500 text-white rounded-lg shadow-md"
        >
          {isEditing ? "ذخیره زنگ" : "ذخیره"}
        </button>
        {isEditing && (
          <button
            onClick={handleDelete}
            className="py-2 px-6 bg-red-500 text-white rounded-lg shadow-md ml-4"
          >
            حذف زنگ
          </button>
        )}
      </div>
    </div>
  );
};

export default ScheduleTask;
