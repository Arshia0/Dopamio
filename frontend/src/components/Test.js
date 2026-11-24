import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import AnimationLottieBG02 from "../lottie/Animationgradientbox02.json";
import ScheduleTask from "./ScheduleTask";
import SidebarBoxes from "./SidebarBoxes";

const TaskInfo = () => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const boxes = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `زنگ ${i + 1}`,
    description: `توضیحات مربوط به زنگ ${i + 1}`,
  }));

  useEffect(() => {
    setSelectedBox(boxes[0]);
  }, []);

  const handleScheduleTask = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="relative flex min-h-screen pt-20">
      {/* استفاده از کامپوننت SidebarBoxes */}
      <SidebarBoxes
        boxes={boxes}
        setSelectedBox={setSelectedBox}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="absolute top-10  p-4 bg-white w-full rounded-lg shadow-lg text-right">
        <div className="text-right">
          <h2 className="text-blue-700 font-semibold text-sm font-vazirmatn">
            درباره زنگ
          </h2>
          <h3 className="text-lg font-bold mt-2 font-vazirmatn">
            {selectedBox ? selectedBox.name : "زنگ ورزش - پیاده روی"}
          </h3>
          <p className="text-gray-700 mt-2 text-sm font-vazirmatn">
            {selectedBox
              ? selectedBox.description
              : "توضیحات راجبه تاثیر ورزش بر دوپامین"}
          </p>
          <div className="flex flex-col items-end mt-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="mb-4 py-2 px-4 bg-blue-600 text-white rounded-lg font-vazirmatn"
            >
              انتخاب زنگی دیگر
            </button>
            {selectedBox && (
              <button
                onClick={handleScheduleTask}
                className="py-2 px-4 bg-green-500 text-white rounded-lg font-vazirmatn"
              >
                بریم انجامش بدیم
              </button>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Lottie
            loop
            animationData={AnimationLottieBG02}
            play
            className="w-full h-32 object-cover"
          />
        </div>
      </div>

      {/* Pop-up for Schedule Task */}
      {popupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <ScheduleTask />
            <button
              onClick={closePopup}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskInfo;
