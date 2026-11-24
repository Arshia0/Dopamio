import { apiUrl } from "../utils/api";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Lottie from "react-lottie-player";
import AnimationLottieBG02 from "../lottie/Animationgradientbox02.json";
import ScheduleTask from "./ScheduleTask";
import SidebarBoxes from "./SidebarBoxes";
import AuthContext from "../context/AuthContext";

const BellDetail = () => {
  const { id } = useParams();
  const [bell, setBell] = useState(null);
  const [bells, setBells] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchBells = async () => {
      try {
        const response = await axios.get(apiUrl("/api/users/bells/"));
        setBells(response.data);

        if (id) {
          const selectedBell = response.data.find((bell) => bell.id === parseInt(id));
          setBell(selectedBell);
        }
      } catch (error) {
        console.error("Error fetching bells:", error);
      }
    };

    fetchBells();
  }, [id]);

  const handleScheduleTask = () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
    } else {
      setPopupOpen(true);
    }
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleBoxSelect = (selectedBell) => {
    setBell(selectedBell);
    setSidebarOpen(false);
  };

  if (!bell) return <div>در حال بارگذاری...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mt-20 font-vazirmatn">
      <SidebarBoxes
        boxes={bells}
        setSelectedBox={handleBoxSelect}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="relative py-3 sm:max-w-3xl w-full mx-4">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10 text-right">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            درباره زنگ
          </h2>
          <div dir="rtl" className="space-y-6">
            {Object.entries(bell.text).map(([key, value]) => (
              <div key={key} className="p-4 bg-gray-50 rounded-lg shadow-md">
                <h4 className="font-bold text-lg mb-2 text-gray-800">{key}</h4>
                {typeof value === "object" && !Array.isArray(value) ? (
                  <div className="pl-4">
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <p key={subKey} className="text-gray-700 mt-2">
                        <strong>{subKey}: </strong>
                        {subValue}
                      </p>
                    ))}
                  </div>
                ) : Array.isArray(value) ? (
                  <ul className="list-disc pl-6">
                    {value.map((item, index) => (
                      <li key={index} className="text-gray-700 mt-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 mt-2">{value}</p>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-8 space-x-4">
          <button
              onClick={handleScheduleTask}
              className="py-2 px-4 bg-green-500 text-white rounded-lg font-vazirmatn hover:bg-green-600 transition"
              dir="rtl"
            >
              برنامه ریزی این زنگ
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg font-vazirmatn hover:bg-blue-700 transition"
              dir="rtl"
            >
              مشاهده زنگ های دیگر
            </button>
          </div>
          <div className="mt-8">
            <Lottie
              loop
              animationData={AnimationLottieBG02}
              play
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>

      {popupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <ScheduleTask
              bell={{ ...bell, id: undefined }}
              isFromBellDetail={true}
            />
            <button
              onClick={closePopup}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
              dir="rtl"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BellDetail;
